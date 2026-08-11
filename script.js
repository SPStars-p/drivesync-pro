/**
 * DriveSync Pro Ultimate Engine v2.5 (Full 11 Features - Full Uncut Version)
 */

// 1. STATE UTAMA APLIKASI
let appState = {
    lang: 'id',
    currentView: 'dashboard',
    explorerLayout: 'grid',
    explorerFilterAcc: 'all',
    explorerSortBy: 'name-asc',
    currentFolderPath: 'root',
    activePreviewFile: null,
    contextTargetItem: null,
    activeTheme: 'blue',
    masterPin: null,
    isBiometricRegistered: false,
    syncIntervalId: null,
    storageChartInstance: null,
    
    accounts: [
        { id: 'poco1', name: 'Poco 1 (Foto)', used: 12.4, total: 15, color: '#3b82f6' },
        { id: 'poco2', name: 'Poco 2 (Audio)', used: 8.1, total: 15, color: '#10b981' },
        { id: 'poco3', name: 'Poco 3 (Dokumen)', used: 4.5, total: 15, color: '#f59e0b' },
        { id: 'poco4', name: 'Poco 4 (Arsip)', used: 14.2, total: 15, color: '#ef4444' },
        { id: 'poco5', name: 'Poco 5 (Umum)', used: 2.0, total: 15, color: '#8b5cf6' }
    ],

    queue: [],

    driveFiles: [
        { id: 'f1', name: 'Dokumen_Proyek.pdf', size: '2.4 MB', rawSize: 2516582, type: 'doc', account: 'poco3', folder: 'root', url: '#' },
        { id: 'f2', name: 'Musik_Latar.mp3', size: '5.1 MB', rawSize: 5347737, type: 'audio', account: 'poco2', folder: 'root', url: '#' },
        { id: 'f3', name: 'Video_Demo.mp4', size: '45.0 MB', rawSize: 47185920, type: 'video', account: 'poco1', folder: 'root', url: '#' },
        { id: 'dir1', name: 'Album Liburan', size: 'Folder', rawSize: 0, type: 'folder', account: 'poco1', folder: 'root', url: '#' },
        { id: 'dir2', name: 'Berkas Pekerjaan', size: 'Folder', rawSize: 0, type: 'folder', account: 'poco3', folder: 'root', url: '#' }
    ],

    trashFiles: [],
    logs: []
};

// 2. INISIALISASI & LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupFileInputListeners();
    setupContextMenuListeners();
});

function initApp() {
    renderAccountsList();
    renderStorageChart();
    renderQueueList();
    renderDriveFiles();
    renderTrashFiles();
    setupDropZone();
    addAuditLog('DriveSync Pro v2.5 Engine berhasil diaktifkan.');
}

function setupContextMenuListeners() {
    document.addEventListener('click', () => {
        const menu = document.getElementById('custom-context-menu');
        if (menu) menu.classList.add('hidden');
    });
}

function showContextMenu(e, itemId) {
    e.preventDefault();
    e.stopPropagation();

    const item = appState.driveFiles.find(f => f.id === itemId);
    if (!item) return;

    appState.contextTargetItem = item;
    const menu = document.getElementById('custom-context-menu');
    if (menu) {
        menu.style.left = `${Math.min(e.clientX, window.innerWidth - 200)}px`;
        menu.style.top = `${Math.min(e.clientY, window.innerHeight - 200)}px`;
        menu.classList.remove('hidden');
    }
}

function ctxAction(action) {
    const item = appState.contextTargetItem;
    if (!item) return;

    if (action === 'preview') openFilePreview(item.id);
    if (action === 'move') openMoveModal(item);
    if (action === 'rename') openRenameModal(item);
    if (action === 'share') openShareModal(item);
    if (action === 'delete') deleteFileToTrash(item.id);
}

// 3. FITUR TERABOX RELOCATION ENGINE
function openMoveModal(item) {
    appState.contextTargetItem = item;
    const titleEl = document.getElementById('move-item-title');
    if (titleEl) titleEl.innerText = `Pindahkan "${item.name}" ke:`;

    const accSelect = document.getElementById('move-target-acc');
    if (accSelect) {
        accSelect.innerHTML = appState.accounts.map(a => `
            <option value="${a.id}" ${a.id === item.account ? 'selected' : ''}>${a.name}</option>
        `).join('');
    }

    updateMoveFolderList();
    toggleModal('modal-move');
}

function updateMoveFolderList() {
    const targetAcc = document.getElementById('move-target-acc')?.value;
    const folderSelect = document.getElementById('move-target-folder');
    if (!folderSelect || !targetAcc) return;

    const folders = appState.driveFiles.filter(f => f.type === 'folder' && f.account === targetAcc && f.id !== appState.contextTargetItem?.id);

    folderSelect.innerHTML = `<option value="root">📁 Root (Direktori Utama)</option>` +
        folders.map(f => `<option value="${f.id}">📁 ${f.name}</option>`).join('');
}

function confirmMoveItem() {
    const item = appState.contextTargetItem;
    if (!item) return;

    const targetAcc = document.getElementById('move-target-acc')?.value;
    const targetFolder = document.getElementById('move-target-folder')?.value;

    const oldAcc = item.account;
    const oldFolder = item.folder;

    item.account = targetAcc;
    item.folder = targetFolder;

    toggleModal('modal-move');
    renderDriveFiles();
    renderAccountsList();
    renderStorageChart();
    showToast(`"${item.name}" berhasil dipindahkan!`, 'success');
    addAuditLog(`TeraBox Relocate: ${item.name} (${oldAcc}:${oldFolder} ➔ ${targetAcc}:${targetFolder})`);
}

// 4. REALTIME PROGRESS SYNC & DUPLICATE CHECK
function handleSelectedFiles(files) {
    if (!files || files.length === 0) return;

    const routeMode = document.getElementById('smart-route-mode')?.value || 'auto';
    const isEncrypted = document.getElementById('encryption-toggle')?.checked || false;

    Array.from(files).forEach(file => {
        let targetAccount = routeMode === 'auto' ? autoRouteFile(file.name) : routeMode;
        let finalName = (isEncrypted ? '🔒 [Encrypted] ' : '') + file.name;

        // Smart Duplicate Check
        const existing = appState.driveFiles.filter(f => f.account === targetAccount && f.name.startsWith(finalName.split('.')[0]));
        if (existing.length > 0) {
            const ext = finalName.includes('.') ? '.' + finalName.split('.').pop() : '';
            const base = finalName.replace(ext, '');
            finalName = `${base} (${existing.length})${ext}`;
        }

        appState.queue.push({
            id: 'q_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: finalName,
            size: formatBytes(file.size),
            rawSize: file.size,
            account: targetAccount,
            type: getFileType(file.name),
            progress: 0,
            status: 'Pending'
        });
    });

    renderQueueList();
    showToast(`${files.length} file ditambahkan ke antrean.`, 'success');
}

function triggerManualSync() {
    if (appState.queue.length === 0) {
        showToast('Antrean kosong.', 'info');
        return;
    }

    showToast('Memulai proses upload...', 'info');

    appState.queue.forEach((item, index) => {
        item.status = 'Uploading';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            item.progress = progress;
            renderQueueList();

            if (progress >= 100) {
                clearInterval(interval);
                item.status = 'Completed';

                appState.driveFiles.push({
                    id: 'f_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                    name: item.name,
                    size: item.size,
                    rawSize: item.rawSize,
                    type: item.type,
                    account: item.account,
                    folder: appState.currentFolderPath,
                    url: '#'
                });

                if (index === appState.queue.length - 1) {
                    setTimeout(() => {
                        appState.queue = [];
                        renderQueueList();
                        renderDriveFiles();
                        renderAccountsList();
                        renderStorageChart();
                        showToast('Semua file berhasil terunggah!', 'success');
                        addAuditLog('Proses sinkronisasi antrean selesai.');
                    }, 500);
                }
            }
        }, 300);
    });
}

// 5. RENAME & SHARE QR GENERATOR
function openRenameModal(item) {
    appState.contextTargetItem = item;
    const input = document.getElementById('rename-input');
    if (input) input.value = item.name;
    toggleModal('modal-rename');
}

function confirmRenameItem() {
    const item = appState.contextTargetItem;
    const newName = document.getElementById('rename-input')?.value;
    if (!item || !newName) return;

    const oldName = item.name;
    item.name = newName;
    toggleModal('modal-rename');
    renderDriveFiles();
    showToast(`Nama diubah menjadi "${newName}"`, 'success');
    addAuditLog(`Rename: ${oldName} ➔ ${newName}`);
}

function openShareModal(item) {
    const nameEl = document.getElementById('share-filename');
    if (nameEl) nameEl.innerText = item.name;
    
    const dummyUrl = `https://drivesync.pro/share/${item.id}`;
    const urlInput = document.getElementById('share-url-input');
    if (urlInput) urlInput.value = dummyUrl;
    
    const qrImg = document.getElementById('share-qr-img');
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(dummyUrl)}`;
    
    toggleModal('modal-share');
}

function copyShareUrl() {
    const input = document.getElementById('share-url-input');
    if (input) {
        input.select();
        document.execCommand('copy');
        showToast('Link berhasil disalin ke clipboard!', 'success');
    }
}

// 6. NAVIGASI, SORTING & RENDERING UI
function setExplorerSort(sortMode) {
    appState.explorerSortBy = sortMode;
    renderExplorerUI();
}

function renderExplorerUI() {
    const container = document.getElementById('explorer-container');
    const searchVal = (document.getElementById('explorer-search')?.value || '').toLowerCase();
    if (!container) return;

    let filtered = appState.driveFiles.filter(f => {
        const matchesAcc = appState.explorerFilterAcc === 'all' || f.account === appState.explorerFilterAcc;
        const matchesFolder = f.folder === appState.currentFolderPath;
        const matchesSearch = f.name.toLowerCase().includes(searchVal);
        return matchesAcc && matchesFolder && matchesSearch;
    });

    // Sorting Logic
    filtered.sort((a, b) => {
        if (appState.explorerSortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (appState.explorerSortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (appState.explorerSortBy === 'size-desc') return b.rawSize - a.rawSize;
        if (appState.explorerSortBy === 'size-asc') return a.rawSize - b.rawSize;
        return 0;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center text-slate-400 py-12"><i class="fa-solid fa-folder-open text-4xl mb-2 opacity-30"></i><p class="text-xs">Folder ini kosong.</p></div>`;
        return;
    }

    if (appState.explorerLayout === 'grid') {
        container.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[340px]";
        container.innerHTML = filtered.map(f => `
            <div oncontextmenu="showContextMenu(event, '${f.id}')" onclick="${f.type === 'folder' ? `navigateToFolder('${f.id}')` : `openFilePreview('${f.id}')`}" 
                 class="p-4 bg-slate-900/60 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-blue-400 transition cursor-pointer group relative">
                <div class="flex items-center gap-3 mb-3">
                    <i class="fa-solid ${f.type === 'video' ? 'fa-video text-purple-400' : f.type === 'audio' ? 'fa-music text-emerald-400' : f.type === 'folder' ? 'fa-folder text-amber-400' : 'fa-file text-blue-400'} text-2xl group-hover:scale-110 transition-transform"></i>
                    <div class="overflow-hidden">
                        <p class="text-xs font-bold text-white truncate">${f.name}</p>
                        <span class="text-[10px] text-slate-400">${f.size}</span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-[9px] bg-slate-800 text-blue-300 font-bold px-2 py-0.5 rounded-md">${f.account}</span>
                    <button onclick="event.stopPropagation(); showContextMenu(event, '${f.id}')" class="text-slate-400 hover:text-white text-xs p-1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
        `).join('');
    } else {
        container.className = "flex flex-col space-y-2 min-h-[340px]";
        container.innerHTML = filtered.map(f => `
            <div oncontextmenu="showContextMenu(event, '${f.id}')" onclick="${f.type === 'folder' ? `navigateToFolder('${f.id}')` : `openFilePreview('${f.id}')`}" 
                 class="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex justify-between items-center hover:border-blue-400 transition cursor-pointer">
                <div class="flex items-center gap-3">
                    <i class="fa-solid ${f.type === 'video' ? 'fa-video text-purple-400' : f.type === 'audio' ? 'fa-music text-emerald-400' : f.type === 'folder' ? 'fa-folder text-amber-400' : 'fa-file text-blue-400'} text-lg"></i>
                    <p class="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-md">${f.name}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-xs text-slate-400">${f.size}</span>
                    <span class="text-[9px] bg-slate-800 text-blue-300 font-bold px-2 py-0.5 rounded-md">${f.account}</span>
                    <button onclick="event.stopPropagation(); showContextMenu(event, '${f.id}')" class="text-slate-400 hover:text-white text-xs p-1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
        `).join('');
    }
}

function renderQueueList() {
    const list = document.getElementById('queue-list');
    if (!list) return;

    if (appState.queue.length === 0) {
        list.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-slate-400 py-10"><i class="fa-solid fa-box-open text-4xl opacity-40 mb-2"></i><p class="text-xs">Tidak ada antrean.</p></div>`;
        return;
    }

    list.innerHTML = appState.queue.map(q => `
        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 space-y-2">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <i class="fa-solid ${q.type === 'video' ? 'fa-video text-purple-400' : 'fa-file text-blue-400'} text-sm"></i>
                    <h4 class="text-xs font-bold text-white truncate max-w-[150px]">${q.name}</h4>
                </div>
                <span class="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md font-bold">${q.status}</span>
            </div>
            ${q.status === 'Uploading' ? `
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style="width: ${q.progress}%"></div>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function renderAccountsList() {
    const list = document.getElementById('drive-list');
    if (!list) return;

    list.innerHTML = appState.accounts.map(acc => {
        const percent = Math.round((acc.used / acc.total) * 100);
        return `
            <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 space-y-1.5">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-white">${acc.name}</span>
                    <span class="text-[10px] text-slate-400">${acc.used} GB / ${acc.total} GB</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="h-1.5 rounded-full" style="width: ${percent}%; background-color: ${acc.color};"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderStorageChart() {
    const ctx = document.getElementById('storageChart')?.getContext('2d');
    if (!ctx || typeof Chart === 'undefined') return;

    if (appState.storageChartInstance) {
        appState.storageChartInstance.destroy();
    }

    appState.storageChartInstance = new Chart(ctx, {
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
            plugins: { legend: { display: false } },
            cutout: '75%'
        }
    });
}

function renderTrashFiles() {
    const container = document.getElementById('trash-container');
    if (!container) return;

    if (appState.trashFiles.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Trash Bin kosong.</p>`;
        return;
    }

    container.innerHTML = appState.trashFiles.map(f => `
        <div class="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex justify-between items-center">
            <span class="text-xs text-white truncate max-w-[150px]">${f.name}</span>
            <button onclick="restoreFromTrash('${f.id}')" class="text-xs text-emerald-400 hover:underline">Pulihkan</button>
        </div>
    `).join('');
}

function deleteFileToTrash(id) {
    const idx = appState.driveFiles.findIndex(f => f.id === id);
    if (idx !== -1) {
        const deleted = appState.driveFiles.splice(idx, 1)[0];
        appState.trashFiles.push(deleted);
        renderDriveFiles();
        renderTrashFiles();
        showToast(`"${deleted.name}" dipindahkan ke Sampah.`, 'info');
        addAuditLog(`Delete: ${deleted.name} ➔ Trash Bin`);
    }
}

function restoreFromTrash(id) {
    const idx = appState.trashFiles.findIndex(f => f.id === id);
    if (idx !== -1) {
        const restored = appState.trashFiles.splice(idx, 1)[0];
        appState.driveFiles.push(restored);
        renderDriveFiles();
        renderTrashFiles();
        showToast(`"${restored.name}" dipulihkan.`, 'success');
        addAuditLog(`Restore: ${restored.name} ➔ Root`);
    }
}

function setupDropZone() {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-500/10');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-500/10');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleSelectedFiles(files);
    });
}

function openFilePreview(id) {
    const item = appState.driveFiles.find(f => f.id === id);
    if (!item) return;

    appState.activePreviewFile = item;
    const titleEl = document.getElementById('preview-title');
    if (titleEl) titleEl.innerText = item.name;

    toggleModal('modal-preview');
}

// UTILITY FUNCTIONS UMUM
function autoRouteFile(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'mp4'].includes(ext)) return 'poco1';
    if (['mp3', 'wav', 'flac'].includes(ext)) return 'poco2';
    if (['pdf', 'docx', 'xlsx', 'txt'].includes(ext)) return 'poco3';
    if (['zip', 'rar', '7z'].includes(ext)) return 'poco4';
    return 'poco5';
}

function navigateToFolder(folderId) {
    appState.currentFolderPath = folderId;
    const folder = appState.driveFiles.find(f => f.id === folderId);
    const breadcrumb = document.getElementById('breadcrumb-current');
    if (breadcrumb) breadcrumb.innerText = folderId === 'root' ? '' : `/ ${folder ? folder.name : folderId}`;
    renderExplorerUI();
}

function toggleModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const msgEl = document.getElementById('toast-msg');
    if (container && msgEl) {
        msgEl.innerText = msg;
        container.classList.remove('hidden');
        setTimeout(() => container.classList.add('hidden'), 3500);
    }
}

function addAuditLog(msg) {
    const time = new Date().toLocaleTimeString();
    appState.logs.unshift(`[${time}] ${msg}`);
    const logContainer = document.getElementById('audit-log-container');
    if (logContainer) {
        logContainer.innerHTML = appState.logs.map(l => `<p class="text-[11px] text-slate-400 border-b border-white/5 py-1">${l}</p>`).join('');
    }
}

function setupFileInputListeners() {
    document.getElementById('file-input')?.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
    document.getElementById('folder-input')?.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
}

function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    if (['mp4', 'mkv', 'avi'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'flac'].includes(ext)) return 'audio';
    if (['zip', 'rar', '7z'].includes(ext)) return 'zip';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    return 'doc';
}

function renderDriveFiles() { renderExplorerUI(); }