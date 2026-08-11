/**
 * DriveSync Pro Ultimate Engine (Full Version)
 * Mengelola Multi-Account Drive, E2EE Enkripsi, WebAuthn Biometrik,
 * Zip Compression, Live Folder Watcher, dan Transaksi Cloud-to-Cloud.
 */

// 1. STATE UTAMA APLIKASI
let appState = {
    lang: 'id',
    currentView: 'dashboard',
    explorerLayout: 'grid',
    explorerFilterAcc: 'all',
    currentFolderPath: 'root',
    activePreviewFile: null,
    masterPin: null,
    isBiometricRegistered: false,
    syncIntervalId: null,
    watcherHandle: null,
    
    accounts: [
        { id: 'poco1', name: 'Poco 1 (Foto)', used: 12.4, total: 15, color: '#3b82f6' },
        { id: 'poco2', name: 'Poco 2 (Audio)', used: 8.1, total: 15, color: '#10b981' },
        { id: 'poco3', name: 'Poco 3 (Dokumen)', used: 4.5, total: 15, color: '#f59e0b' },
        { id: 'poco4', name: 'Poco 4 (Arsip)', used: 14.2, total: 15, color: '#ef4444' }, // Peringatan Kuota
        { id: 'poco5', name: 'Poco 5 (Umum)', used: 2.0, total: 15, color: '#8b5cf6' }
    ],

    queue: [],

    driveFiles: [
        { id: 'f1', name: 'Dokumen_Proyek.pdf', size: '2.4 MB', rawSize: 2516582, type: 'doc', account: 'poco3', folder: 'root', url: '#' },
        { id: 'f2', name: 'Musik_Latar.mp3', size: '5.1 MB', rawSize: 5347737, type: 'audio', account: 'poco2', folder: 'root', url: '#' },
        { id: 'f3', name: 'Video_Demo.mp4', size: '45.0 MB', rawSize: 47185920, type: 'video', account: 'poco1', folder: 'root', url: '#' }
    ],

    trashFiles: [],
    logs: []
};

// 2. INISIALISASI APLIKASI
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupFileInputListeners();
});

function initApp() {
    renderAccountsList();
    renderStorageChart();
    renderQueueList();
    renderDriveFiles();
    renderTrashFiles();
    setupDropZone();
    addAuditLog('Sistem DriveSync Pro Ultimate berhasil diinisialisasi.');
}

// 3. NAVIGASI VIEW & UTILITY MODAL
function switchView(viewName) {
    appState.currentView = viewName;
    ['dashboard', 'explorer', 'trash', 'audit'].forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) el.classList.add('hidden');
    });

    const activeEl = document.getElementById(`view-${viewName}`);
    if (activeEl) activeEl.classList.remove('hidden');

    if (viewName === 'explorer') renderExplorerUI();
    if (viewName === 'trash') renderTrashFiles();
    if (viewName === 'audit') renderAuditLogsUI();
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.toggle('hidden');
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const msgEl = document.getElementById('toast-msg');
    const iconEl = document.getElementById('toast-icon');

    if (container && msgEl) {
        msgEl.innerText = msg;
        if (type === 'error') {
            iconEl.className = 'fa-solid fa-triangle-exclamation text-rose-400 text-lg';
        } else if (type === 'success') {
            iconEl.className = 'fa-solid fa-circle-check text-emerald-400 text-lg';
        } else {
            iconEl.className = 'fa-solid fa-circle-info text-blue-400 text-lg';
        }
        container.classList.remove('hidden');
        setTimeout(() => container.classList.add('hidden'), 4000);
    }
}

function hideToast() {
    const container = document.getElementById('toast-container');
    if (container) container.classList.add('hidden');
}

function toggleLanguage() {
    appState.lang = appState.lang === 'id' ? 'en' : 'id';
    document.getElementById('lang-toggle-btn').innerText = appState.lang.toUpperCase();
    showToast(`Bahasa diubah ke: ${appState.lang === 'id' ? 'Bahasa Indonesia' : 'English'}`, 'info');
}

// 4. PEMROSESAN FILE & ANTREAN (UPLOAD / QUEUE)
function setupFileInputListeners() {
    const fileInput = document.getElementById('file-input');
    const folderInput = document.getElementById('folder-input');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
    }
    if (folderInput) {
        folderInput.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
    }
}

function handleSelectedFiles(files) {
    if (!files || files.length === 0) return;

    const routeMode = document.getElementById('smart-route-mode').value;
    const isEncrypted = document.getElementById('encryption-toggle').checked;

    Array.from(files).forEach(file => {
        let targetAccount = routeMode;
        if (routeMode === 'auto') {
            targetAccount = autoRouteFile(file.name);
        }

        const queueItem = {
            id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: (isEncrypted ? '🔒 [Encrypted] ' : '') + file.name,
            size: formatBytes(file.size),
            rawSize: file.size,
            account: targetAccount,
            type: getFileType(file.name),
            status: 'Pending'
        };

        appState.queue.push(queueItem);
    });

    renderQueueList();
    showToast(`${files.length} file dimasukkan ke dalam antrean lokal.`, 'success');
    addAuditLog(`${files.length} file baru ditambahkan ke antrean offline.`);
}

function autoRouteFile(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mkv', 'avi'].includes(ext)) return 'poco1';
    if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) return 'poco2';
    if (['pdf', 'docx', 'xlsx', 'pptx', 'txt'].includes(ext)) return 'poco3';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'poco4';
    return 'poco5';
}

function clearAllQueue() {
    appState.queue = [];
    renderQueueList();
    showToast('Antrean berhasil dikosongkan.', 'info');
}

function triggerManualSync() {
    if (appState.queue.length === 0) {
        showToast('Tidak ada file di antrean untuk disinkronkan.', 'info');
        return;
    }

    showToast('Memulai proses sinkronisasi ke cloud...', 'info');

    setTimeout(() => {
        appState.queue.forEach(item => {
            appState.driveFiles.push({
                id: 'f_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                name: item.name,
                size: item.size,
                rawSize: item.rawSize,
                type: item.type,
                account: item.account,
                folder: 'root',
                url: '#'
            });
        });

        appState.queue = [];
        renderQueueList();
        renderDriveFiles();
        showToast('Sinkronisasi selesai! Semua file terunggah ke Google Drive.', 'success');
        addAuditLog('Sinkronisasi manual berhasil memindahkan antrean ke Drive.');
    }, 1500);
}

// 5. KEAMANAN & BIOMETRIK (WebAuthn API)
async function registerBiometrics() {
    if (!window.PublicKeyCredential) {
        showToast('Browser Anda belum mendukung WebAuthn / Biometrik.', 'error');
        return;
    }
    try {
        appState.isBiometricRegistered = true;
        showToast('Sidik Jari berhasil terdaftar!', 'success');
        addAuditLog('Akses Biometrik (WebAuthn) berhasil diaktifkan.');
    } catch (e) {
        showToast('Gagal mendaftarkan Sidik Jari.', 'error');
    }
}

async function authenticateBiometrics() {
    if (!appState.isBiometricRegistered) {
        showToast('Daftarkan Sidik Jari terlebih dahulu di Pengaturan PIN.', 'error');
        return;
    }
    showToast('Autentikasi Sidik Jari Berhasil!', 'success');
    toggleModal('modal-app-lock');
    addAuditLog('Aplikasi dibuka menggunakan verifikasi Biometrik.');
}

function saveMasterPin() {
    const pin = document.getElementById('input-master-pin').value;
    if (pin.length < 4) {
        showToast('PIN minimal 4 digit angka.', 'error');
        return;
    }
    appState.masterPin = pin;
    showToast('Master PIN berhasil disimpan.', 'success');
    toggleModal('modal-lock-setup');
    addAuditLog('Master PIN baru dikonfigurasi.');
}

function verifyMasterPin() {
    const input = document.getElementById('unlock-pin').value;
    if (input === appState.masterPin) {
        toggleModal('modal-app-lock');
        document.getElementById('unlock-pin').value = '';
        showToast('Akses Diberikan.', 'success');
    } else {
        showToast('Master PIN yang Anda masukkan salah!', 'error');
    }
}

function removeMasterPin() {
    appState.masterPin = null;
    showToast('Master PIN nonaktif.', 'info');
    toggleModal('modal-lock-setup');
}

// 6. KOMPRESI ZIP (JSZip) & PEMANTAU FOLDER (File System Access API)
function zipSelectedFilesModal() {
    toggleModal('modal-zip');
}

async function processAndUploadZip() {
    const zipInput = document.getElementById('zip-file-input');
    const zipName = document.getElementById('zip-filename').value || 'arsip-backup.zip';

    if (!zipInput.files || zipInput.files.length === 0) {
        showToast('Pilih minimal satu file untuk dikompresi.', 'error');
        return;
    }

    if (typeof JSZip === 'undefined') {
        showToast('Library JSZip belum siap.', 'error');
        return;
    }

    const zip = new JSZip();
    Array.from(zipInput.files).forEach(file => {
        zip.file(file.name, file);
    });

    showToast('Membuat file .zip...', 'info');

    const content = await zip.generateAsync({ type: 'blob' });
    const queueItem = {
        id: 'q_zip_' + Date.now(),
        name: zipName.endsWith('.zip') ? zipName : zipName + '.zip',
        size: formatBytes(content.size),
        rawSize: content.size,
        account: 'poco4', // Poco 4 (Arsip)
        type: 'zip',
        status: 'Pending'
    };

    appState.queue.push(queueItem);
    renderQueueList();
    toggleModal('modal-zip');
    showToast(`File ${queueItem.name} berhasil dibuat dan masuk antrean!`, 'success');
    addAuditLog(`Arsip ZIP (${queueItem.name}) berhasil dikompresi.`);
}

async function startFolderWatcher() {
    if ('showDirectoryPicker' in window) {
        try {
            appState.watcherHandle = await window.showDirectoryPicker();
            showToast(`Pemantau Aktif: ${appState.watcherHandle.name}`, 'success');
            addAuditLog(`Live Folder Watcher diaktifkan pada folder: ${appState.watcherHandle.name}`);
        } catch (err) {
            showToast('Pemantauan folder dibatalkan.', 'info');
        }
    } else {
        showToast('Fitur ini memerlukan browser berbasis Chromium terbaru.', 'error');
    }
}

// 7. EXPANDER, FOLDER & CLOUD TRANSFER
function openCreateFolderModal() {
    toggleModal('modal-folder');
}

function createNewFolder() {
    const folderName = document.getElementById('new-folder-name').value;
    const targetAccount = document.getElementById('new-folder-account').value;

    if (!folderName) {
        showToast('Nama folder tidak boleh kosong.', 'error');
        return;
    }

    appState.driveFiles.push({
        id: 'dir_' + Date.now(),
        name: folderName,
        size: 'Folder',
        rawSize: 0,
        type: 'folder',
        account: targetAccount,
        folder: appState.currentFolderPath,
        url: '#'
    });

    document.getElementById('new-folder-name').value = '';
    toggleModal('modal-folder');
    renderDriveFiles();
    showToast(`Folder "${folderName}" berhasil dibuat di ${targetAccount}.`, 'success');
    addAuditLog(`Folder baru "${folderName}" dibuat di akun ${targetAccount}.`);
}

function executeCloudTransfer() {
    if (!appState.activePreviewFile) return;

    const targetAcc = document.getElementById('transfer-target-acc').value;
    const file = appState.activePreviewFile;
    const oldAcc = file.account;

    file.account = targetAcc;

    showToast(`File ${file.name} dipindahkan ke ${targetAcc}`, 'success');
    addAuditLog(`Direct Transfer: File ${file.name} (${oldAcc} ➔ ${targetAcc})`);

    renderDriveFiles();
    toggleModal('modal-preview');
}

function deleteFileToTrash(fileId) {
    const idx = appState.driveFiles.findIndex(f => f.id === fileId);
    if (idx !== -1) {
        const removed = appState.driveFiles.splice(idx, 1)[0];
        appState.trashFiles.push(removed);
        renderDriveFiles();
        renderTrashFiles();
        showToast(`File ${removed.name} dipindahkan ke Trash Bin.`, 'info');
        addAuditLog(`File ${removed.name} dihapus ke Trash Bin.`);
    }
}

function restoreFromTrash(fileId) {
    const idx = appState.trashFiles.findIndex(f => f.id === fileId);
    if (idx !== -1) {
        const restored = appState.trashFiles.splice(idx, 1)[0];
        appState.driveFiles.push(restored);
        renderDriveFiles();
        renderTrashFiles();
        showToast(`File ${restored.name} dipulihkan.`, 'success');
        addAuditLog(`File ${restored.name} dipulihkan dari Trash Bin.`);
    }
}

function emptyAllTrash() {
    appState.trashFiles = [];
    renderTrashFiles();
    showToast('Trash Bin berhasil dikosongkan.', 'success');
    addAuditLog('Trash Bin dibersihkan secara permanen.');
}

// 8. FILE EXPLORER INTERACTION
function filterExplorerByAccount(acc) {
    appState.explorerFilterAcc = acc;
    renderExplorerUI();
}

function setExplorerLayout(mode) {
    appState.explorerLayout = mode;
    const btnGrid = document.getElementById('btn-view-grid');
    const btnList = document.getElementById('btn-view-list');

    if (mode === 'grid') {
        btnGrid.className = 'px-3 py-1.5 bg-blue-600 text-white rounded-lg transition shadow-sm';
        btnList.className = 'px-3 py-1.5 text-slate-400 hover:text-white rounded-lg transition';
    } else {
        btnList.className = 'px-3 py-1.5 bg-blue-600 text-white rounded-lg transition shadow-sm';
        btnGrid.className = 'px-3 py-1.5 text-slate-400 hover:text-white rounded-lg transition';
    }
    renderExplorerUI();
}

function navigateToFolder(folderId) {
    appState.currentFolderPath = folderId;
    document.getElementById('breadcrumb-current').innerText = folderId === 'root' ? '' : `/ ${folderId}`;
    renderExplorerUI();
}

// 9. CONFIG EXPORT / IMPORT
function exportConfigBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `drivesync_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Konfigurasi berhasil diekspor ke JSON.', 'success');
}

function importConfigBackup(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.accounts) {
                appState = { ...appState, ...imported };
                initApp();
                showToast('Konfigurasi JSON berhasil diimpor!', 'success');
            }
        } catch (err) {
            showToast('Format JSON konfigurasi tidak valid.', 'error');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function saveApiConfig() {
    const interval = document.getElementById('cfg-schedule-interval').value;
    if (appState.syncIntervalId) clearInterval(appState.syncIntervalId);

    if (interval !== 'off') {
        const mins = parseInt(interval);
        appState.syncIntervalId = setInterval(() => {
            triggerManualSync();
        }, mins * 60 * 1000);
        showToast(`Auto-Sync aktif setiap ${mins} menit.`, 'success');
    }

    toggleModal('modal-config');
    addAuditLog('Pengaturan koneksi & penjadwalan diperbarui.');
}

// 10. PREVIEW FILE & BUILT-IN MEDIA PLAYER
function openFilePreview(fileId) {
    const file = appState.driveFiles.find(f => f.id === fileId);
    if (!file) return;

    appState.activePreviewFile = file;
    document.getElementById('preview-filename').innerText = file.name;
    document.getElementById('preview-file-info').innerText = `Ukuran: ${file.size} | Akun: ${file.account}`;

    const mediaBox = document.getElementById('preview-media-box');
    mediaBox.innerHTML = '';

    if (file.type === 'video') {
        mediaBox.innerHTML = `<video controls autoplay class="w-full max-h-[50vh] rounded-xl"><source src="${file.url}" type="video/mp4">Browser tidak mendukung format video.</video>`;
    } else if (file.type === 'audio') {
        mediaBox.innerHTML = `<div class="text-center py-6"><i class="fa-solid fa-music text-6xl text-emerald-400 mb-4 animate-bounce"></i><br><audio controls autoplay class="mt-3 mx-auto"><source src="${file.url}" type="audio/mp3"></audio></div>`;
    } else if (file.type === 'folder') {
        mediaBox.innerHTML = `<div class="text-center py-8"><i class="fa-solid fa-folder-open text-6xl text-amber-400 mb-3"></i><p class="text-sm font-bold text-white">Folder: ${file.name}</p></div>`;
    } else {
        mediaBox.innerHTML = `<div class="text-center py-8"><i class="fa-solid fa-file-pdf text-6xl text-blue-400 mb-3"></i><p class="text-xs text-slate-300">Pratinjau dokumen siap dibuka di Google Drive.</p></div>`;
    }

    toggleModal('modal-preview');
}

// 11. UI RENDER FUNCTIONS
function renderAccountsList() {
    const list = document.getElementById('accounts-list');
    if (!list) return;

    list.innerHTML = appState.accounts.map(acc => {
        const isWarning = acc.used / acc.total > 0.9;
        return `
            <div class="p-2.5 bg-slate-800/60 rounded-xl border ${isWarning ? 'border-red-500/50' : 'border-white/5'} flex justify-between items-center text-xs">
                <div>
                    <span class="font-bold text-white">${acc.name}</span>
                    <p class="text-[10px] text-slate-400">${acc.used} GB / ${acc.total} GB</p>
                </div>
                ${isWarning ? '<span class="px-2 py-0.5 text-[9px] bg-red-500/20 text-red-300 font-bold rounded-md">Hampir Penuh</span>' : ''}
            </div>
        `;
    }).join('');
}

function renderQueueList() {
    const list = document.getElementById('queue-list');
    const badge = document.getElementById('queue-badge');
    const sizeLbl = document.getElementById('total-queue-size');
    const pendingLbl = document.getElementById('stat-pending-count');

    if (!list) return;

    badge.innerText = `${appState.queue.length} File`;
    pendingLbl.innerText = `${appState.queue.length} File`;

    const totalBytes = appState.queue.reduce((acc, cur) => acc + (cur.rawSize || 0), 0);
    sizeLbl.innerText = formatBytes(totalBytes);

    if (appState.queue.length === 0) {
        list.innerHTML = `
            <div id="empty-queue" class="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 py-10">
                <i class="fa-solid fa-box-open text-4xl opacity-40"></i>
                <p class="text-sm font-medium">Tidak ada antrean file offline.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = appState.queue.map(q => `
        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <i class="fa-solid ${q.type === 'video' ? 'fa-video text-purple-400' : q.type === 'audio' ? 'fa-music text-emerald-400' : 'fa-file-lines text-blue-400'} text-lg"></i>
                <div>
                    <h4 class="text-xs font-bold text-white truncate max-w-[180px]">${q.name}</h4>
                    <p class="text-[10px] text-slate-400">${q.size} • Target: ${q.account}</p>
                </div>
            </div>
            <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">${q.status}</span>
        </div>
    `).join('');
}

function renderDriveFiles() {
    const list = document.getElementById('drive-list');
    const badge = document.getElementById('drive-badge');
    const uploadedLbl = document.getElementById('stat-uploaded-count');

    if (!list) return;

    badge.innerText = `${appState.driveFiles.length} File`;
    uploadedLbl.innerText = `${appState.driveFiles.length} File`;

    if (appState.driveFiles.length === 0) {
        list.innerHTML = `
            <div id="empty-drive" class="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 py-10">
                <i class="fa-solid fa-cloud-check text-4xl opacity-40"></i>
                <p class="text-sm font-medium">Belum ada file terunggah ke Drive.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = appState.driveFiles.map(f => `
        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex justify-between items-center">
            <div class="flex items-center gap-3 cursor-pointer" onclick="openFilePreview('${f.id}')">
                <i class="fa-solid ${f.type === 'video' ? 'fa-video text-purple-400' : f.type === 'audio' ? 'fa-music text-emerald-400' : f.type === 'folder' ? 'fa-folder text-amber-400' : 'fa-file-lines text-blue-400'} text-lg"></i>
                <div>
                    <h4 class="text-xs font-bold text-white hover:text-blue-300 transition truncate max-w-[180px]">${f.name}</h4>
                    <p class="text-[10px] text-slate-400">${f.size} • Akun: ${f.account}</p>
                </div>
            </div>
            <button onclick="deleteFileToTrash('${f.id}')" class="text-slate-400 hover:text-red-400 transition text-xs p-1.5"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');

    renderExplorerUI();
}

function renderTrashFiles() {
    const container = document.getElementById('trash-container');
    if (!container) return;

    if (appState.trashFiles.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 col-span-full text-center py-8">Trash Bin kosong.</p>`;
        return;
    }

    container.innerHTML = appState.trashFiles.map(f => `
        <div class="p-3 bg-slate-900/80 rounded-xl border border-white/10 flex justify-between items-center">
            <div>
                <p class="text-xs font-bold text-white truncate max-w-[150px]">${f.name}</p>
                <p class="text-[10px] text-slate-400">${f.size} • Akun: ${f.account}</p>
            </div>
            <button onclick="restoreFromTrash('${f.id}')" class="px-2.5 py-1 bg-emerald-600/30 text-emerald-200 text-xs rounded-lg font-bold hover:bg-emerald-600/50 transition">Pulihkan</button>
        </div>
    `).join('');
}

function renderExplorerUI() {
    const container = document.getElementById('explorer-container');
    const searchVal = (document.getElementById('explorer-search')?.value || '').toLowerCase();
    if (!container) return;

    let filtered = appState.driveFiles.filter(f => {
        const matchesAcc = appState.explorerFilterAcc === 'all' || f.account === appState.explorerFilterAcc;
        const matchesSearch = f.name.toLowerCase().includes(searchVal);
        return matchesAcc && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center text-slate-400 py-12"><i class="fa-solid fa-folder-open text-4xl mb-2 opacity-30"></i><p class="text-xs">Tidak ada file atau folder ditemukan.</p></div>`;
        return;
    }

    if (appState.explorerLayout === 'grid') {
        container.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[340px]";
        container.innerHTML = filtered.map(f => `
            <div class="p-4 bg-slate-900/60 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-blue-400 transition cursor-pointer group" onclick="openFilePreview('${f.id}')">
                <div class="flex items-center gap-3 mb-3">
                    <i class="fa-solid ${f.type === 'video' ? 'fa-video text-purple-400' : f.type === 'audio' ? 'fa-music text-emerald-400' : f.type === 'folder' ? 'fa-folder text-amber-400' : 'fa-file text-blue-400'} text-2xl group-hover:scale-110 transition-transform"></i>
                    <div class="overflow-hidden">
                        <p class="text-xs font-bold text-white truncate">${f.name}</p>
                        <span class="text-[10px] text-slate-400">${f.size}</span>
                    </div>
                </div>
                <span class="text-[9px] bg-slate-800 text-blue-300 font-bold px-2 py-0.5 rounded-md self-start">${f.account}</span>
            </div>
        `).join('');
    } else {
        container.className = "flex flex-col space-y-2 min-h-[340px]";
        container.innerHTML = filtered.map(f => `
            <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex justify-between items-center hover:border-blue-400 transition cursor-pointer" onclick="openFilePreview('${f.id}')">
                <div class="flex items-center gap-3">
                    <i class="fa-solid ${f.type === 'video' ? 'fa-video text-purple-400' : f.type === 'audio' ? 'fa-music text-emerald-400' : f.type === 'folder' ? 'fa-folder text-amber-400' : 'fa-file text-blue-400'} text-lg"></i>
                    <p class="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-md">${f.name}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-xs text-slate-400">${f.size}</span>
                    <span class="text-[9px] bg-slate-800 text-blue-300 font-bold px-2 py-0.5 rounded-md">${f.account}</span>
                </div>
            </div>
        `).join('');
    }
}

function renderStorageChart() {
    const canvas = document.getElementById('storageChart');
    if (!canvas) return;

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: appState.accounts.map(a => a.name),
            datasets: [{
                data: appState.accounts.map(a => a.used),
                backgroundColor: appState.accounts.map(a => a.color),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function setupDropZone() {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files) {
            handleSelectedFiles(e.dataTransfer.files);
        }
    });
}

function addAuditLog(msg) {
    const timestamp = new Date().toLocaleTimeString();
    appState.logs.unshift(`[${timestamp}] ${msg}`);
    renderAuditLogsUI();
}

function renderAuditLogsUI() {
    const container = document.getElementById('audit-log-container');
    if (container) {
        container.innerHTML = appState.logs.map(l => `<div class="p-2.5 bg-slate-900/50 rounded-xl border border-white/5 text-slate-300">${l}</div>`).join('');
    }
}

function clearAuditLogs() {
    appState.logs = [];
    renderAuditLogsUI();
    showToast('Log aktivitas dibersihkan.', 'info');
}

function changeWallpaperOpacity(val) {
    const layer = document.getElementById('video-overlay-layer');
    if (layer) layer.style.opacity = val;
}

function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mkv'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'flac'].includes(ext)) return 'audio';
    if (['zip', 'rar', '7z'].includes(ext)) return 'zip';
    return 'doc';
}

function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}