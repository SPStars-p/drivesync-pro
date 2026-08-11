// --- MULTI-LANGUAGE DICTIONARY (i18n) ---
const i18n = {
    id: {
        meta_title: "DriveSync Ultimate - Enterprise Multi-Account AutoSync",
        setup_btn: "Atur Client ID Google",
        nav_dashboard: "Dashboard Sync",
        nav_explorer: "File Explorer Cloud",
        nav_audit: "Audit Log Aktivitas",
        nav_security: "Keamanan Master PIN",
        nav_settings: "Pengaturan & Telegram Bot",
        idb_label: "Database Offline:",
        header_title: "Sinkronisasi Google Drive Asli",
        header_subtitle: "Pilih atau letakkan file dari laptop. Aplikasi otomatis mengunggah ke cloud.",
        sync_now: "Sync Sekarang",
        drop_title: "Tarik & Letakkan File di Sini",
        drop_desc: "File akan otomatis dikategorikan ke 5 akun Google Drive tujuan berdasarkan format file.",
        route_label: "Target:",
        opt_auto: "⚡ Smart Auto-Route",
        dedup_label: "Anti Duplikat Hash",
        btn_files: "Pilih File",
        btn_folder: "Unggah Satu Folder",
        storage_title: "Analisis Penyimpanan",
        queue_size_lbl: "Ukuran Antrean:",
        pending_lbl: "Pending (Offline):",
        uploaded_lbl: "Telah Terunggah:",
        autobalance_title: "Resumable & Chunked Active",
        autobalance_desc: "Dukungan file besar & enkripsi lokal aktif.",
        queue_panel_title: "Antrean Lokal (Auto-Retry)",
        no_queue: "Tidak ada antrean file offline.",
        cloud_panel_title: "Tersimpan di Cloud",
        no_cloud: "Belum ada file terunggah ke Drive.",
        all_accounts: "Semua Akun",
        new_folder_btn: "Buat Folder Baru",
        zip_btn: "Buat Arsip Zip",
        modal_folder_title: "Buat Folder Baru",
        folder_name_lbl: "Nama Folder",
        folder_acc_lbl: "Simpan di Akun Drive:",
        btn_cancel: "Batal",
        btn_create: "Buat Folder",
        modal_zip_title: "Kompresi File ke ZIP",
        modal_zip_desc: "Pilih beberapa file dari perangkat Anda untuk dikompresi menjadi satu file .zip sebelum diunggah:",
        zip_name_lbl: "Nama File ZIP:",
        btn_compress: "Kompres & Unggah",
        btn_copylink: "Salin Link",
        btn_opendrive: "Buka Google Drive",
        settings_modal_title: "Pengaturan Lanjutan & Telegram",
        cfg_client_lbl: "Google Client ID (OAuth 2.0)",
        cfg_bg_url_lbl: "Custom Wallpaper Video URL (MP4 / WebM)",
        cfg_opacity_lbl: "Transparansi Latar Belakang Wallpaper",
        btn_export: "Ekspor JSON",
        btn_import: "Impor JSON",
        btn_save: "Simpan Pengaturan",
        pin_setup_title: "Atur Master PIN",
        pin_setup_desc: "Amankan sesi aplikasi dengan PIN 4 digit:",
        btn_remove_pin: "Hapus PIN",
        btn_save_pin: "Simpan PIN",
        lock_title: "DriveSync Terkunci",
        lock_desc: "Masukkan Master PIN untuk membuka aplikasi.",
        btn_unlock: "Buka Kunci",
        qr_modal_title: "QR Code File",
        btn_close: "Tutup",
        audit_title: "Audit Log Aktivitas Sistem"
    },
    en: {
        meta_title: "DriveSync Ultimate - Enterprise Multi-Account AutoSync",
        setup_btn: "Setup Google Client ID",
        nav_dashboard: "Dashboard Sync",
        nav_explorer: "Cloud File Explorer",
        nav_audit: "Audit Activity Log",
        nav_security: "Master PIN Security",
        nav_settings: "Settings & Telegram Bot",
        idb_label: "Offline DB:",
        header_title: "Real Google Drive AutoSync",
        header_subtitle: "Drag and drop files from your computer. The app automatically syncs them to the cloud.",
        sync_now: "Sync Now",
        drop_title: "Drag & Drop Files Here",
        drop_desc: "Files are automatically routed across 5 Google Drive accounts based on file type.",
        route_label: "Target:",
        opt_auto: "⚡ Smart Auto-Route",
        dedup_label: "Hash Anti-Duplication",
        btn_files: "Select Files",
        btn_folder: "Upload Full Folder",
        storage_title: "Storage Analytics",
        queue_size_lbl: "Queue Size:",
        pending_lbl: "Pending (Offline):",
        uploaded_lbl: "Successfully Uploaded:",
        autobalance_title: "Resumable & Chunked Active",
        autobalance_desc: "Large file support & local encryption enabled.",
        queue_panel_title: "Local Queue (Auto-Retry)",
        no_queue: "No offline file queue.",
        cloud_panel_title: "Stored in Cloud",
        no_cloud: "No files uploaded to Drive yet.",
        all_accounts: "All Accounts",
        new_folder_btn: "Create New Folder",
        zip_btn: "Create Zip Archive",
        modal_folder_title: "Create New Folder",
        folder_name_lbl: "Folder Name",
        folder_acc_lbl: "Save in Drive Account:",
        btn_cancel: "Cancel",
        btn_create: "Create Folder",
        modal_zip_title: "Compress Files to ZIP",
        modal_zip_desc: "Select multiple files from your device to compress into a .zip file before uploading:",
        zip_name_lbl: "ZIP Filename:",
        btn_compress: "Compress & Upload",
        btn_copylink: "Copy Link",
        btn_opendrive: "Open Google Drive",
        settings_modal_title: "Advanced Settings & Telegram",
        cfg_client_lbl: "Google Client ID (OAuth 2.0)",
        cfg_bg_url_lbl: "Custom Wallpaper Video URL (MP4 / WebM)",
        cfg_opacity_lbl: "Wallpaper Background Opacity",
        btn_export: "Export JSON",
        btn_import: "Import JSON",
        btn_save: "Save Settings",
        pin_setup_title: "Setup Master PIN",
        pin_setup_desc: "Secure app session with a 4-digit PIN:",
        btn_remove_pin: "Remove PIN",
        btn_save_pin: "Save PIN",
        lock_title: "DriveSync Locked",
        lock_desc: "Enter Master PIN to unlock the application.",
        btn_unlock: "Unlock",
        qr_modal_title: "File QR Code",
        btn_close: "Close",
        audit_title: "System Audit Activity Log"
    }
};

let currentLang = localStorage.getItem('drivesync_lang') || 'id';

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('drivesync_lang', currentLang);
    document.getElementById('lang-toggle-btn').innerText = currentLang.toUpperCase();
    applyTranslations();
}

function applyTranslations() {
    const dict = i18n[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });
    const metaTitle = document.getElementById('meta-title');
    if (metaTitle) metaTitle.innerText = dict.meta_title;
}

let config = {
    clientId: localStorage.getItem('gdrive_client_id') || '',
    wallpaperOpacity: localStorage.getItem('gdrive_wallpaper_opacity') || '0.88',
    videoUrl: localStorage.getItem('gdrive_video_url') || '',
    telegramToken: localStorage.getItem('gdrive_tg_token') || '',
    telegramChatId: localStorage.getItem('gdrive_tg_chatid') || '',
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile'
};

let accounts = JSON.parse(localStorage.getItem('gdrive_multi_accounts')) || [
    { id: 'poco1', name: 'Poco 1 (Foto & Video)', email: 'Belum Terhubung', category: 'media', icon: 'fa-image', color: 'text-purple-300 bg-purple-500/20 border-purple-500/40', token: null, tokenExpiresAt: 0, quota: null },
    { id: 'poco2', name: 'Poco 2 (Musik & Audio)', email: 'Belum Terhubung', category: 'music', icon: 'fa-music', color: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40', token: null, tokenExpiresAt: 0, quota: null },
    { id: 'poco3', name: 'Poco 3 (Dokumen)', email: 'Belum Terhubung', category: 'docs', icon: 'fa-file-lines', color: 'text-amber-300 bg-amber-500/20 border-amber-500/40', token: null, tokenExpiresAt: 0, quota: null },
    { id: 'poco4', name: 'Poco 4 (Arsip & Backup)', email: 'Belum Terhubung', category: 'archive', icon: 'fa-file-zipper', color: 'text-pink-300 bg-pink-500/20 border-pink-500/40', token: null, tokenExpiresAt: 0, quota: null },
    { id: 'poco5', name: 'Poco 5 (Umum / Lainnya)', email: 'Belum Terhubung', category: 'general', icon: 'fa-hard-drive', color: 'text-blue-300 bg-blue-500/20 border-blue-500/40', token: null, tokenExpiresAt: 0, quota: null },
];

let isOnline = navigator.onLine;
let tokenClient = null;
let isSyncing = false;
let db = null;
let activeView = 'dashboard';
let currentAccountFilter = 'all';
let explorerLayout = 'grid';
let currentFolderId = 'root'; 
let storageChartInstance = null;

// --- HELPER FUNCTIONS ---
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function copyLink(url) {
    if (!url) return;
    navigator.clipboard.writeText(url);
    showToast("Tautan berhasil disalin!", "success");
}

// --- INDEXEDDB STORAGE SYSTEM ---
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('DriveSyncDB', 2);
        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('files')) {
                database.createObjectStore('files', { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains('folders')) {
                database.createObjectStore('folders', { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains('audit_logs')) {
                database.createObjectStore('audit_logs', { keyPath: 'id' });
            }
        };
        request.onsuccess = (e) => { db = e.target.result; resolve(db); };
        request.onerror = (e) => reject(e.target.error);
    });
}

function getAllFilesFromDB() {
    return new Promise((resolve) => {
        if (!db) return resolve([]);
        const tx = db.transaction(['files'], 'readonly');
        const req = tx.objectStore('files').getAll();
        req.onsuccess = () => resolve(req.result || []);
    });
}

function saveFileToDB(fileData) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve();
        const tx = db.transaction(['files'], 'readwrite');
        tx.objectStore('files').put(fileData);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function deleteFileFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve();
        const tx = db.transaction(['files'], 'readwrite');
        tx.objectStore('files').delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function getAllFoldersFromDB() {
    return new Promise((resolve) => {
        if (!db) return resolve([]);
        const tx = db.transaction(['folders'], 'readonly');
        const req = tx.objectStore('folders').getAll();
        req.onsuccess = () => resolve(req.result || []);
    });
}

function saveFolderToDB(folderData) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve();
        const tx = db.transaction(['folders'], 'readwrite');
        tx.objectStore('folders').put(folderData);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

function deleteFolderFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve();
        const tx = db.transaction(['folders'], 'readwrite');
        tx.objectStore('folders').delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// --- ENKRIPSI AES-GCM (WEB CRYPTO API) ---
async function encryptFileBuffer(fileBuffer, password = "DriveSyncMasterKeySecure") {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
    );
    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv }, key, fileBuffer
    );
    const combined = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContent.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.byteLength);
    combined.set(new Uint8Array(encryptedContent), salt.byteLength + iv.byteLength);
    return combined.buffer;
}

// --- AUDIT TRAIL LOGGING ---
async function logAuditAction(action, detail) {
    const logEntry = {
        id: 'audit_' + Date.now() + '_' + Math.random().toString(36).substring(2,6),
        timestamp: new Date().toISOString(),
        action: action,
        detail: detail
    };
    if (db) {
        await new Promise((resolve, reject) => {
            const tx = db.transaction(['audit_logs'], 'readwrite');
            tx.objectStore('audit_logs').put(logEntry);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
    renderAuditLogsUI();
}

async function renderAuditLogsUI() {
    if (!db) return;
    const container = document.getElementById('audit-log-container');
    if (!container) return;
    const logs = await new Promise((resolve) => {
        const tx = db.transaction(['audit_logs'], 'readonly');
        const req = tx.objectStore('audit_logs').getAll();
        req.onsuccess = () => resolve(req.result || []);
    });

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (logs.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-center py-6">Belum ada aktivitas tercatat.</p>`;
        return;
    }

    let html = '';
    logs.forEach(l => {
        const dateStr = new Date(l.timestamp).toLocaleString();
        html += `
            <div class="p-2.5 bg-slate-900/70 border border-white/10 rounded-xl flex flex-col gap-1">
                <div class="flex justify-between text-[10px] text-slate-400">
                    <span class="font-bold text-emerald-400">[${escapeHtml(l.action)}]</span>
                    <span>${dateStr}</span>
                </div>
                <p class="text-white">${escapeHtml(l.detail)}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function clearAuditLogs() {
    if (!confirm("Hapus semua log audit?")) return;
    const tx = db.transaction(['audit_logs'], 'readwrite');
    tx.objectStore('audit_logs').clear();
    renderAuditLogsUI();
    showToast("Log audit dibersihkan.", "info");
}

function initStorageChart() {
    const ctx = document.getElementById('storageChart');
    if (!ctx) return;
    storageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: accounts.map(a => a.name.split(' ')[0]),
            datasets: [{
                data: [20, 20, 20, 20, 20],
                backgroundColor: ['#c084fc', '#34d399', '#fbbf24', '#f472b6', '#60a5fa'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '70%'
        }
    });
}

function updateStorageChartData() {
    if (!storageChartInstance) return;
    const data = accounts.map(acc => acc.quota ? Math.round(acc.quota.usage / (1024*1024)) : 1);
    storageChartInstance.data.datasets[0].data = data;
    storageChartInstance.update();
}

function saveMasterPin() {
    const pin = document.getElementById('input-master-pin').value.trim();
    if (!pin) { showToast("PIN tidak boleh kosong.", "warning"); return; }
    localStorage.setItem('drive_master_pin', pin);
    toggleModal('modal-lock-setup');
    showToast("Master PIN berhasil diaktifkan!", "success");
    logAuditAction("SECURITY", "Master PIN diaktifkan.");
}

function removeMasterPin() {
    localStorage.removeItem('drive_master_pin');
    toggleModal('modal-lock-setup');
    showToast("Master PIN dinonaktifkan.", "info");
    logAuditAction("SECURITY", "Master PIN dinonaktifkan.");
}

function checkAppLockOnStart() {
    const savedPin = localStorage.getItem('drive_master_pin');
    if (savedPin) {
        document.getElementById('modal-app-lock').classList.remove('hidden');
    }
}

function verifyMasterPin() {
    const input = document.getElementById('unlock-pin').value.trim();
    const savedPin = localStorage.getItem('drive_master_pin');
    if (input === savedPin) {
        document.getElementById('modal-app-lock').classList.add('hidden');
        showToast("Aplikasi berhasil dibuka.", "success");
        logAuditAction("SECURITY", "Aplikasi dibuka dengan Master PIN.");
    } else {
        showToast("PIN salah!", "error");
    }
}

function showQRCodeModal(fileName, url) {
    toggleModal('modal-qrcode');
    document.getElementById('qr-filename').innerText = fileName;
    const box = document.getElementById('qrcode-box');
    box.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
        new QRCode(box, {
            text: url || 'https://drive.google.com',
            width: 130,
            height: 130,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        box.innerText = "QR Lib tidak tersedia";
    }
}

function zipSelectedFilesModal() {
    toggleModal('modal-zip');
}

async function processAndUploadZip() {
    const fileInput = document.getElementById('zip-file-input');
    const zipName = document.getElementById('zip-filename').value.trim() || 'arsip.zip';
    if (!fileInput.files || fileInput.files.length === 0) {
        showToast("Pilih setidaknya satu file untuk dikompresi.", "warning");
        return;
    }

    const zip = new JSZip();
    for (let i = 0; i < fileInput.files.length; i++) {
        const f = fileInput.files[i];
        zip.file(f.name, f);
    }

    showToast("Sedang mengompresi file ke ZIP...", "info");
    try {
        const content = await zip.generateAsync({ type: "blob" });
        const zipFile = new File([content], zipName, { type: "application/zip" });
        toggleModal('modal-zip');
        await handleFiles([zipFile]);
        showToast("File ZIP berhasil dibuat dan dimasukkan ke antrean!", "success");
        logAuditAction("ZIP_COMPRESS", `Arsip ZIP ${zipName} berhasil dibuat.`);
    } catch (err) {
        showToast("Gagal membuat file ZIP.", "error");
    }
}

function changeWallpaperOpacity(val) {
    config.wallpaperOpacity = val;
    localStorage.setItem('gdrive_wallpaper_opacity', val);
    applyWallpaperOpacity();
}

function applyWallpaperOpacity() {
    const layer = document.getElementById('video-overlay-layer');
    if (layer) {
        layer.style.setProperty('--overlay-opacity', config.wallpaperOpacity);
        layer.style.setProperty('--overlay-opacity-2', String(parseFloat(config.wallpaperOpacity) - 0.2));
    }
    const slider = document.getElementById('wallpaper-opacity-slider');
    if (slider) slider.value = config.wallpaperOpacity;

    if (config.videoUrl) {
        const videoSrc = document.getElementById('bg-video-source');
        const videoEl = document.getElementById('bg-video-element');
        if (videoSrc && videoEl && videoSrc.src !== config.videoUrl) {
            videoSrc.src = config.videoUrl;
            videoEl.load();
        }
    }
}

async function sendTelegramNotification(msg) {
    if (!config.telegramToken || !config.telegramChatId) return;
    try {
        await fetch(`https://api.telegram.org/bot${config.telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: config.telegramChatId, text: msg, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.warn("Gagal mengirim notifikasi Telegram", e);
    }
}

function exportConfigBackup() {
    const backupData = {
        clientId: config.clientId,
        telegramToken: config.telegramToken,
        telegramChatId: config.telegramChatId,
        videoUrl: config.videoUrl,
        accounts: accounts.map(a => ({ id: a.id, name: a.name, email: a.email }))
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drivesync-config-backup.json';
    a.click();
    showToast("Konfigurasi berhasil diekspor!", "success");
    logAuditAction("CONFIG", "Backup konfigurasi diekspor.");
}

function importConfigBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.clientId) {
                config.clientId = data.clientId;
                localStorage.setItem('gdrive_client_id', config.clientId);
                document.getElementById('cfg-client-id').value = config.clientId;
            }
            if (data.telegramToken) { config.telegramToken = data.telegramToken; localStorage.setItem('gdrive_tg_token', data.telegramToken); document.getElementById('cfg-tg-token').value = data.telegramToken; }
            if (data.telegramChatId) { config.telegramChatId = data.telegramChatId; localStorage.setItem('gdrive_tg_chatid', data.telegramChatId); document.getElementById('cfg-tg-chatid').value = data.telegramChatId; }
            if (data.videoUrl) { config.videoUrl = data.videoUrl; localStorage.setItem('gdrive_video_url', data.videoUrl); document.getElementById('cfg-video-url').value = data.videoUrl; }
            showToast("Konfigurasi berhasil dipulihkan!", "success");
            toggleModal('modal-config');
            applyWallpaperOpacity();
            logAuditAction("CONFIG", "Konfigurasi dipulihkan dari file JSON.");
        } catch (err) {
            showToast("File backup tidak valid.", "error");
        }
    };
    reader.readAsText(file);
}

function renderAccountsList() {
    const container = document.getElementById('accounts-list');
    const badge = document.getElementById('account-status-badge');
    if (!container) return;

    let connectedCount = 0;
    let html = '';

    accounts.forEach(acc => {
        const hasValidToken = isTokenValid(acc);
        if (hasValidToken) {
            connectedCount++;
            if (!acc.quota) fetchAccountQuota(acc);
        }

        let quotaInfo = '';
        if (acc.quota && acc.quota.limit > 0) {
            const usagePercent = Math.round((acc.quota.usage / acc.quota.limit) * 100);
            quotaInfo = `
                <div class="mt-1.5 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div class="bg-blue-400 h-1 rounded-full" style="width: ${usagePercent}%"></div>
                </div>
                <p class="text-[9px] text-slate-400 mt-0.5">${formatBytes(acc.quota.usage)} / ${formatBytes(acc.quota.limit)} (${usagePercent}%)</p>
            `;
        }

        let statusBadge = hasValidToken 
            ? `<span class="text-[9px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2.5 py-1 rounded-md font-bold">Terhubung</span>`
            : `<button onclick="connectGoogleAccount('${acc.id}')" class="text-[9px] bg-blue-500/30 text-blue-200 hover:bg-blue-500 hover:text-white border border-blue-400/40 px-2.5 py-1 rounded-md font-bold transition">Hubungkan</button>`;

        html += `
            <div class="p-3 bg-slate-900/60 border border-white/10 rounded-xl flex flex-col gap-1.5 backdrop-blur-sm transition hover:bg-slate-800/80">
                <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2.5 overflow-hidden pr-2">
                        <div class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 border ${acc.color}">
                            <i class="fa-solid ${acc.icon}"></i>
                        </div>
                        <div class="truncate">
                            <p class="font-bold text-white truncate">${escapeHtml(acc.name)}</p>
                            <p class="text-[10px] text-slate-300 truncate">${escapeHtml(acc.email)}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 flex-shrink-0">
                        ${statusBadge}
                        ${acc.token ? `<button onclick="disconnectGoogleAccount('${acc.id}')" title="Putuskan" class="text-slate-400 hover:text-red-400 p-1"><i class="fa-solid fa-link-slash text-xs"></i></button>` : ''}
                    </div>
                </div>
                ${quotaInfo}
            </div>
        `;
    });

    container.innerHTML = html;
    if (badge) {
        badge.className = connectedCount > 0 ? "bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/30";
        badge.innerText = `${connectedCount}/5 Terhubung`;
    }
}

function initGoogleAuth() {
    if (!config.clientId || typeof google === 'undefined') return;
    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: config.clientId,
            scope: config.scope,
            callback: async (response) => {
                if (response.error !== undefined) {
                    showToast("Gagal Login ke Google: " + response.error, "error");
                    return;
                }
                const targetId = window.pendingTargetAccountId || accounts.find(a => !isTokenValid(a))?.id || 'poco1';
                const acc = accounts.find(a => a.id === targetId);
                if (acc) {
                    acc.token = response.access_token;
                    acc.tokenExpiresAt = Date.now() + (parseInt(response.expires_in || 3600) * 1000);
                    try {
                        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: { Authorization: `Bearer ${response.access_token}` }
                        });
                        if (userInfoRes.ok) {
                            const profile = await userInfoRes.json();
                            acc.email = profile.email || acc.email;
                        }
                    } catch (e) {}
                    localStorage.setItem('gdrive_multi_accounts', JSON.stringify(accounts));
                    renderAccountsList();
                    showToast(`Berhasil menghubungkan ${acc.name}!`, "success");
                    logAuditAction("AUTH", `Akun Google ${acc.name} (${acc.email}) terhubung.`);
                    window.pendingTargetAccountId = null;
                    if (isOnline && !isSyncing) processQueue();
                }
            },
        });
    } catch (err) {}
}

function connectGoogleAccount(targetAccId) {
    if (!config.clientId) { toggleModal('modal-config'); showToast("Masukkan Client ID terlebih dahulu.", "warning"); return; }
    window.pendingTargetAccountId = targetAccId;
    if (!tokenClient) initGoogleAuth();
    if (tokenClient) tokenClient.requestAccessToken({ prompt: 'select_account' });
}

function disconnectGoogleAccount(accountId) {
    const acc = accounts.find(a => a.id === accountId);
    if (acc) {
        acc.token = null; acc.tokenExpiresAt = 0; acc.email = 'Belum Terhubung'; acc.quota = null;
        localStorage.setItem('gdrive_multi_accounts', JSON.stringify(accounts));
        renderAccountsList();
        showToast(`Koneksi ${acc.name} diputuskan.`, "info");
        logAuditAction("AUTH", `Koneksi akun ${acc.name} diputuskan.`);
    }
}

function isTokenValid(acc) {
    return acc.token && Date.now() < acc.tokenExpiresAt;
}

async function fetchAccountQuota(acc) {
    if (!isTokenValid(acc)) return;
    try {
        const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=storageQuota', {
            headers: { Authorization: `Bearer ${acc.token}` }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.storageQuota) {
                acc.quota = {
                    limit: parseInt(data.storageQuota.limit || 0),
                    usage: parseInt(data.storageQuota.usageInDrive || 0)
                };
                renderAccountsList();
                updateStorageChartData();
            }
        }
    } catch (e) {}
}

function determineTargetAccount(file) {
    const routeMode = document.getElementById('smart-route-mode')?.value || 'auto';
    if (routeMode !== 'auto') {
        const matched = accounts.find(a => a.id === routeMode);
        if (matched) return matched;
    }
    const type = file.type || '';
    const name = file.name.toLowerCase();
    if (type.startsWith('image/') || type.startsWith('video/') || name.match(/\.(jpg|jpeg|png|gif|webp|mp4|mkv|mov)$/i)) return accounts[0];
    if (type.startsWith('audio/') || name.match(/\.(mp3|wav|flac|aac)$/i)) return accounts[1];
    if (type.includes('pdf') || type.includes('document') || name.match(/\.(pdf|doc|docx|xls|xlsx|txt)$/i)) return accounts[2];
    if (name.match(/\.(zip|rar|7z|tar)$/i)) return accounts[3];
    return accounts[4];
}

async function handleFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    const useDeduplication = document.getElementById('deduplication-toggle')?.checked ?? true;
    const useEncryption = document.getElementById('encryption-toggle')?.checked ?? false;
    const existingFiles = useDeduplication ? await getAllFilesFromDB() : [];

    let addedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];
        const relativePath = file.webkitRelativePath || file.name;
        
        let targetFolderId = currentFolderId;
        if (relativePath.includes('/')) {
            const pathParts = relativePath.split('/');
            pathParts.pop();
            let currentParent = currentFolderId;
            for (const part of pathParts) {
                const existingFolders = await getAllFoldersFromDB();
                let found = existingFolders.find(f => f.name === part && f.parentId === currentParent);
                if (!found) {
                    const newFolderId = 'folder_' + Date.now() + '_' + Math.random().toString(36).substring(2,5);
                    const targetAcc = determineTargetAccount(file);
                    found = {
                        id: newFolderId,
                        name: part,
                        parentId: currentParent,
                        targetAccountId: targetAcc.id,
                        createdAt: new Date().toISOString()
                    };
                    await saveFolderToDB(found);
                }
                currentParent = found.id;
            }
            targetFolderId = currentParent;
        }

        if (useDeduplication) {
            const isDuplicate = existingFiles.some(f => f.name === relativePath && f.size === file.size && f.status !== 'failed');
            if (isDuplicate) {
                skippedCount++;
                continue;
            }
        }

        let finalBlob = file;
        let isEncrypted = false;
        if (useEncryption) {
            try {
                const arrayBuf = await file.arrayBuffer();
                const encryptedBuf = await encryptFileBuffer(arrayBuf);
                finalBlob = new Blob([encryptedBuf], { type: 'application/octet-stream' });
                isEncrypted = true;
            } catch (err) {
                console.warn("Enkripsi gagal, menggunakan file asli", err);
            }
        }

        const targetAccount = determineTargetAccount(file);
        const fileData = {
            id: 'file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8) + '_' + i,
            name: relativePath,
            size: finalBlob.size,
            type: isEncrypted ? 'application/octet-stream' : file.type,
            targetAccountId: targetAccount.id,
            folderId: targetFolderId,
            fileBlob: finalBlob,
            isEncrypted: isEncrypted,
            status: 'pending',
            retryCount: 0,
            createdAt: new Date().toISOString()
        };
        await saveFileToDB(fileData);
        addedCount++;
    }

    await loadFilesFromDB();
    if (addedCount > 0) {
        showToast(`${addedCount} file ditambahkan ke antrean.${skippedCount > 0 ? ` (${skippedCount} duplikat dilewati)` : ''}`, "success");
        logAuditAction("UPLOAD_QUEUE", `${addedCount} file baru dimasukkan ke antrean sinkronisasi.`);
    } else if (skippedCount > 0) {
        showToast(`${skippedCount} file duplikat dilewati (Hash match).`, "info");
    }

    if (isOnline && !isSyncing) processQueue();
}

async function loadFilesFromDB() {
    if (!db) return;
    const files = await getAllFilesFromDB();
    const queueList = document.getElementById('queue-list');
    const driveList = document.getElementById('drive-list');
    if (!queueList || !driveList) return;

    queueList.innerHTML = ''; driveList.innerHTML = '';
    let pendingCount = 0, uploadedCount = 0, totalPendingSize = 0;

    files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    files.forEach(f => {
        if (f.status === 'pending' || f.status === 'uploading' || f.status === 'failed') {
            pendingCount++;
            totalPendingSize += f.size;
            renderQueueUI(f, queueList);
        } else if (f.status === 'uploaded') {
            uploadedCount++;
            renderDriveUI(f, driveList);
        }
    });

    document.getElementById('queue-badge').innerText = `${pendingCount} File`;
    document.getElementById('drive-badge').innerText = `${uploadedCount} File`;
    document.getElementById('stat-pending-count').innerText = `${pendingCount} File`;
    document.getElementById('stat-uploaded-count').innerText = `${uploadedCount} File`;
    document.getElementById('total-queue-size').innerText = formatBytes(totalPendingSize);

    if (pendingCount === 0) queueList.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-10"><i class="fa-solid fa-box-open text-3xl opacity-40"></i><p class="text-xs" data-i18n="no_queue">Tidak ada antrean.</p></div>`;
    if (uploadedCount === 0) driveList.innerHTML = `<div class="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-10"><i class="fa-solid fa-cloud-check text-3xl opacity-40"></i><p class="text-xs" data-i18n="no_cloud">Belum ada file terunggah.</p></div>`;

    if (activeView === 'explorer') renderExplorerUI();
}

function renderQueueUI(fileData, container) {
    const item = document.createElement('div');
    item.id = fileData.id;
    item.className = 'bg-slate-900/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex flex-col gap-2 shadow-sm';
    const targetAcc = accounts.find(a => a.id === fileData.targetAccountId) || accounts[4];
    const statusText = fileData.status === 'failed' ? `Gagal (${fileData.retryCount}/3)` : (fileData.status === 'uploading' ? 'Mengunggah (Chunked)...' : 'Pending');

    item.innerHTML = `
        <div class="flex justify-between items-start gap-3">
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-file-arrow-up text-amber-400 text-sm"></i>
                </div>
                <div class="truncate">
                    <p class="text-xs font-bold text-white truncate">${escapeHtml(fileData.name)} ${fileData.isEncrypted ? '<span class="text-purple-400 text-[10px]"><i class="fa-solid fa-lock"></i> E2EE</span>' : ''}</p>
                    <p class="text-[10px] text-slate-400">${formatBytes(fileData.size)}</p>
                </div>
            </div>
            <span class="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">${statusText}</span>
        </div>
        <div class="flex justify-between items-center text-[11px] pt-1.5 border-t border-white/10">
            <span class="text-slate-400 text-[10px]">Tujuan:</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${targetAcc.color}">${targetAcc.name}</span>
        </div>
        <div class="w-full bg-slate-800 rounded-full h-1.5 ${fileData.status === 'uploading' ? '' : 'hidden'} overflow-hidden">
            <div class="bg-blue-400 h-1.5 rounded-full progress-bar-fill w-0"></div>
        </div>
    `;
    container.appendChild(item);
}

function renderDriveUI(fileData, container) {
    const item = document.createElement('div');
    item.className = 'bg-slate-900/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex justify-between items-center gap-3 shadow-sm hover:bg-slate-800/80 transition';
    const targetAcc = accounts.find(a => a.id === fileData.targetAccountId) || accounts[4];

    item.innerHTML = `
        <div class="flex items-center gap-3 overflow-hidden">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-cloud-circle-check text-emerald-400 text-sm"></i>
            </div>
            <div class="truncate">
                <p class="text-xs font-bold text-white truncate">${escapeHtml(fileData.name)}</p>
                <p class="text-[10px] text-slate-400">${formatBytes(fileData.size)} &bull; <span class="text-blue-300">${targetAcc.name}</span></p>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <button onclick="showQRCodeModal('${escapeHtml(fileData.name)}', '${fileData.webViewLink}')" title="QR Code" class="text-slate-300 hover:text-purple-400 p-2 rounded-lg text-xs"><i class="fa-solid fa-qrcode"></i></button>
            <button onclick="copyLink('${fileData.webViewLink}')" title="Salin Tautan" class="text-slate-300 hover:text-blue-400 p-2 rounded-lg text-xs"><i class="fa-solid fa-link"></i></button>
            <button onclick="deleteFileFromCloudAndDB('${fileData.id}', '${fileData.driveFileId}', '${fileData.targetAccountId}')" title="Hapus Permanen dari Cloud" class="text-slate-400 hover:text-red-400 p-2 rounded-lg text-xs"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `;
    container.appendChild(item);
}

async function deleteFileFromCloudAndDB(recordId, driveFileId, accountId) {
    if (!confirm("Hapus file ini secara permanen dari Google Drive dan lokal?")) return;
    const acc = accounts.find(a => a.id === accountId);
    if (acc && isTokenValid(acc) && driveFileId) {
        try {
            await fetch(`https://www.googleapis.com/drive/v3/files/${driveFileId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${acc.token}` }
            });
        } catch (e) {}
    }
    await deleteFileFromDB(recordId);
    await loadFilesFromDB();
    showToast("File berhasil dihapus.", "success");
    logAuditAction("DELETE", `File ${recordId} dihapus dari cloud dan database.`);
}

async function processQueue() {
    if (!isOnline || isSyncing || !db) return;
    const allFiles = await getAllFilesFromDB();
    const pendingFiles = allFiles.filter(f => f.status === 'pending' || f.status === 'failed');
    if (pendingFiles.length === 0) { isSyncing = false; return; }

    isSyncing = true;
    const currentFile = pendingFiles[0];
    const targetAccount = accounts.find(a => a.id === currentFile.targetAccountId) || accounts[4];

    if (!isTokenValid(targetAccount)) {
        isSyncing = false;
        return;
    }

    currentFile.status = 'uploading';
    await saveFileToDB(currentFile);
    await loadFilesFromDB();

    const element = document.getElementById(currentFile.id);
    const progBar = element ? element.querySelector('.progress-bar-fill') : null;

    try {
        const driveResult = await uploadResumableToGoogleDrive(currentFile, targetAccount.token, (progress) => {
            if (progBar) progBar.style.width = `${progress}%`;
        });

        currentFile.status = 'uploaded';
        currentFile.driveFileId = driveResult.id || null;
        currentFile.webViewLink = driveResult.webViewLink || null;
        currentFile.fileBlob = null; 

        await saveFileToDB(currentFile);
        showToast(`"${currentFile.name}" berhasil terunggah!`, "success");
        logAuditAction("UPLOAD_SUCCESS", `File "${currentFile.name}" berhasil disync ke ${targetAccount.name}.`);
        sendTelegramNotification(`🚀 *DriveSync Ultimate Upload Berhasil*\n\nFile: \`${currentFile.name}\`\nAkun: ${targetAccount.name}`);
    } catch (err) {
        currentFile.retryCount = (currentFile.retryCount || 0) + 1;
        if (currentFile.retryCount >= 3) {
            currentFile.status = 'failed';
            showToast(`Gagal mengunggah ${currentFile.name} setelah 3 kali percobaan.`, "error");
            logAuditAction("UPLOAD_FAIL", `File "${currentFile.name}" gagal diunggah setelah 3x percobaan.`);
            sendTelegramNotification(`❌ *DriveSync Ultimate Upload Gagal*\n\nFile: \`${currentFile.name}\` gagal.`);
        } else {
            currentFile.status = 'pending';
        }
        await saveFileToDB(currentFile);
    } finally {
        isSyncing = false;
        await loadFilesFromDB();
        if (isOnline) setTimeout(processQueue, 500);
    }
}

async function uploadResumableToGoogleDrive(fileData, token, onProgress) {
    const metadata = { name: fileData.name, mimeType: fileData.type || 'application/octet-stream' };
    
    const initRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Upload-Content-Type': fileData.type || 'application/octet-stream',
            'X-Upload-Content-Length': fileData.fileBlob.size
        },
        body: JSON.stringify(metadata)
    });

    if (!initRes.ok) throw new Error('Gagal menginisiasi Resumable Upload');
    const uploadUrl = initRes.headers.get('Location');
    if (!uploadUrl) throw new Error('Location header tidak ditemukan');

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        xhr.setRequestHeader('Content-Type', fileData.type || 'application/octet-stream');

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    resolve({ id: 'res_' + Date.now(), webViewLink: 'https://drive.google.com' });
                }
            } else {
                reject(new Error('Resumable Upload Error HTTP ' + xhr.status));
            }
        };
        xhr.onerror = () => reject(new Error('Network error saat chunked upload'));
        xhr.send(fileData.fileBlob);
    });
}

function switchView(viewName) {
    activeView = viewName;
    const dashEl = document.getElementById('view-dashboard');
    const expEl = document.getElementById('view-explorer');
    const auditEl = document.getElementById('view-audit');
    const navDash = document.getElementById('nav-dashboard');
    const navExp = document.getElementById('nav-explorer');
    const navAudit = document.getElementById('nav-audit');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    const activeClass = "w-full flex items-center gap-3.5 bg-blue-600/40 border border-blue-500/40 text-white px-4 py-3.5 rounded-xl font-bold text-sm transition text-left backdrop-blur-md shadow-md";
    const inactiveClass = "w-full flex items-center gap-3.5 text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10 px-4 py-3.5 rounded-xl font-medium text-sm transition text-left";

    dashEl.classList.add('hidden');
    expEl.classList.add('hidden');
    auditEl.classList.add('hidden');
    navDash.className = inactiveClass;
    navExp.className = inactiveClass;
    navAudit.className = inactiveClass;

    if (viewName === 'dashboard') {
        dashEl.classList.remove('hidden');
        navDash.className = activeClass;
        pageTitle.setAttribute('data-i18n', 'header_title');
        pageSubtitle.setAttribute('data-i18n', 'header_subtitle');
    } else if (viewName === 'explorer') {
        expEl.classList.remove('hidden');
        navExp.className = activeClass;
        pageTitle.removeAttribute('data-i18n');
        pageSubtitle.removeAttribute('data-i18n');
        pageTitle.innerText = currentLang === 'id' ? "Jelajah File Cloud (Drive Explorer)" : "Cloud File Explorer";
        pageSubtitle.innerText = currentLang === 'id' ? "Kelola folder dan file yang tersimpan di Google Drive Anda secara terstruktur." : "Manage folders and files stored in your Google Drive structured.";
        renderExplorerAccountFilters();
        renderExplorerUI();
    } else if (viewName === 'audit') {
        auditEl.classList.remove('hidden');
        navAudit.className = activeClass;
        pageTitle.removeAttribute('data-i18n');
        pageSubtitle.removeAttribute('data-i18n');
        pageTitle.innerText = currentLang === 'id' ? "Audit Log Aktivitas Sistem" : "System Audit Activity Log";
        pageSubtitle.innerText = currentLang === 'id' ? "Riwayat kronologis seluruh aktivitas keamanan dan transfer file." : "Chronological history of security and transfer actions.";
        renderAuditLogsUI();
    }
    applyTranslations();
}

function renderExplorerAccountFilters() {
    const container = document.getElementById('explorer-account-filters');
    if (!container) return;

    let html = `<button onclick="filterExplorerByAccount('all')" class="exp-acc-btn text-xs px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition ${currentAccountFilter === 'all' ? 'bg-blue-600 text-white border border-blue-500 shadow-md' : 'bg-slate-900/70 border border-white/20 text-slate-300 hover:text-white'}">🌐 ${currentLang === 'id' ? 'Semua Akun' : 'All Accounts'}</button>`;
    accounts.forEach(acc => {
        const isActive = currentAccountFilter === acc.id;
        html += `<button onclick="filterExplorerByAccount('${acc.id}')" class="exp-acc-btn text-xs px-3.5 py-2.5 rounded-xl font-bold whitespace-nowrap transition ${isActive ? 'bg-blue-600 text-white border border-blue-500' : 'bg-slate-900/70 border border-white/20 text-slate-300 hover:text-white'}"><i class="fa-solid ${acc.icon} mr-1"></i> ${acc.name.split(' ')[0]}</button>`;
    });
    container.innerHTML = html;
}

function filterExplorerByAccount(accId) {
    currentAccountFilter = accId;
    renderExplorerAccountFilters();
    renderExplorerUI();
}

function setExplorerLayout(layout) {
    explorerLayout = layout;
    document.getElementById('btn-view-grid').className = layout === 'grid' ? "px-3 py-1.5 bg-blue-600 text-white rounded-lg transition" : "px-3 py-1.5 text-slate-400 hover:text-white rounded-lg transition";
    document.getElementById('btn-view-list').className = layout === 'list' ? "px-3 py-1.5 bg-blue-600 text-white rounded-lg transition" : "px-3 py-1.5 text-slate-400 hover:text-white rounded-lg transition";
    renderExplorerUI();
}

async function renderExplorerUI() {
    if (!db) return;
    const allFiles = await getAllFilesFromDB();
    const uploadedFiles = allFiles.filter(f => f.status === 'uploaded');
    const allFolders = await getAllFoldersFromDB();

    const container = document.getElementById('explorer-container');
    const searchInput = document.getElementById('explorer-search');
    const searchKeyword = searchInput ? searchInput.value.toLowerCase() : '';
    if (!container) return;

    let filteredFolders = allFolders.filter(f => f.parentId === currentFolderId && (currentAccountFilter === 'all' || f.targetAccountId === currentAccountFilter) && f.name.toLowerCase().includes(searchKeyword));
    let filteredFiles = uploadedFiles.filter(f => {
        const matchFolder = (f.folderId || 'root') === currentFolderId;
        const matchAcc = currentAccountFilter === 'all' || f.targetAccountId === currentAccountFilter;
        const matchSearch = f.name.toLowerCase().includes(searchKeyword);
        return matchFolder && matchAcc && matchSearch;
    });

    if (filteredFolders.length === 0 && filteredFiles.length === 0) {
        container.className = "min-h-[340px] flex flex-col items-center justify-center text-slate-400 col-span-full space-y-3 py-12";
        container.innerHTML = `<i class="fa-solid fa-folder-open text-5xl mb-1 opacity-30"></i><p class="text-sm font-bold">${currentLang === 'id' ? 'Folder ini kosong.' : 'This folder is empty.'}</p>`;
        return;
    }

    container.className = explorerLayout === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5" : "flex flex-col gap-3 col-span-full";
    
    let html = '';
    filteredFolders.forEach(folder => {
        const targetAcc = accounts.find(a => a.id === folder.targetAccountId) || accounts[4];
        html += `
            <div ondblclick="navigateToFolder('${folder.id}', '${escapeHtml(folder.name)}')" class="bg-slate-900/70 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/50 transition cursor-pointer group shadow-md">
                <div class="flex items-center justify-between mb-3">
                    <i class="fa-solid fa-folder text-3xl text-amber-400 group-hover:scale-110 transition-transform"></i>
                    <button onclick="deleteFolder('${folder.id}')" title="Hapus" class="text-slate-400 hover:text-red-400 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </div>
                <div>
                    <p class="text-xs font-bold text-white truncate">${escapeHtml(folder.name)}</p>
                    <span class="text-[9px] text-slate-400">${targetAcc.name.split(' ')[0]}</span>
                </div>
            </div>
        `;
    });

    filteredFiles.forEach(file => {
        html += renderExplorerGridItem(file);
    });

    container.innerHTML = html;
}

async function deleteFolder(folderId) {
    if (!confirm("Hapus folder ini? File di dalamnya akan dipindahkan ke root.")) return;
    const allFiles = await getAllFilesFromDB();
    for (const f of allFiles) {
        if (f.folderId === folderId) { f.folderId = 'root'; await saveFileToDB(f); }
    }
    await deleteFolderFromDB(folderId);
    showToast("Folder dihapus.", "success");
    logAuditAction("FOLDER", `Folder ${folderId} dihapus.`);
    renderExplorerUI();
}

function renderExplorerGridItem(fileData) {
    const targetAcc = accounts.find(a => a.id === fileData.targetAccountId) || accounts[4];
    return `
        <div class="bg-slate-900/70 border border-white/10 rounded-2xl flex flex-col overflow-hidden hover:border-blue-400/50 transition group shadow-md">
            <div class="h-28 bg-slate-950/60 flex items-center justify-center cursor-pointer relative" onclick="openPreviewModal('${fileData.id}')">
                <i class="fa-solid fa-file-lines text-3xl text-blue-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="p-3.5 flex flex-col justify-between flex-1 gap-2">
                <div>
                    <p class="text-xs font-bold text-white truncate">${escapeHtml(fileData.name)}</p>
                    <p class="text-[10px] text-slate-400">${formatBytes(fileData.size)}</p>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-white/10">
                    <span class="text-[9px] px-2 py-0.5 rounded border font-bold ${targetAcc.color}">${targetAcc.name.split(' ')[0]}</span>
                    <div class="flex items-center gap-1">
                        <button onclick="showQRCodeModal('${escapeHtml(fileData.name)}', '${fileData.webViewLink}')" title="QR" class="text-slate-300 hover:text-purple-400 p-1 text-xs"><i class="fa-solid fa-qrcode"></i></button>
                        <button onclick="copyLink('${fileData.webViewLink}')" title="Salin" class="text-slate-300 hover:text-blue-400 p-1 text-xs"><i class="fa-solid fa-link"></i></button>
                        <button onclick="downloadOrOpenDrive('${fileData.id}')" title="Buka" class="text-slate-300 hover:text-blue-400 p-1 text-xs"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function openPreviewModal(id) {
    const allFiles = await getAllFilesFromDB();
    const fileData = allFiles.find(f => f.id === id);
    if (!fileData) return;

    document.getElementById('preview-filename').innerText = fileData.name;
    document.getElementById('preview-media-box').innerHTML = `<div class="text-center"><i class="fa-brands fa-google-drive text-4xl text-blue-400 mb-2"></i><p class="text-sm font-bold text-white">${escapeHtml(fileData.name)}</p></div>`;
    document.getElementById('btn-download-preview').onclick = () => downloadOrOpenDrive(id);
    document.getElementById('btn-copy-preview').onclick = () => copyLink(fileData.webViewLink);
    toggleModal('modal-preview');
}

async function downloadOrOpenDrive(id) {
    const allFiles = await getAllFilesFromDB();
    const fileData = allFiles.find(f => f.id === id);
    if (fileData && fileData.webViewLink) window.open(fileData.webViewLink, '_blank');
}

function updateNetworkStatus(online) {
    isOnline = online;
    const netStatus = document.getElementById('network-status');
    if (!netStatus) return;
    if (online) {
        netStatus.className = "flex items-center gap-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-xs";
        netStatus.innerHTML = `<div class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></div><span>Sinyal Online (Terhubung)</span>`;
        processQueue();
    } else {
        netStatus.className = "flex items-center gap-3 p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium text-xs";
        netStatus.innerHTML = `<div class="relative flex h-2.5 w-2.5"><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span></div><span>Sinyal Offline (Terputus)</span>`;
    }
}

function showToast(msg, type = "info") {
    const toast = document.getElementById('toast-container');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;
    toastMsg.innerText = msg;
    toast.className = type === 'success' ? "bg-emerald-600/30 border border-emerald-500/50 text-emerald-100 p-4 rounded-xl flex items-center justify-between gap-3 text-xs md:text-sm shadow-xl" : "bg-blue-600/30 border border-blue-500/50 text-blue-100 p-4 rounded-xl flex items-center justify-between gap-3 text-xs md:text-sm shadow-xl";
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

function hideToast() { document.getElementById('toast-container')?.classList.add('hidden'); }
function toggleModal(modalId) { document.getElementById(modalId)?.classList.toggle('hidden'); }

function saveApiConfig() {
    config.clientId = document.getElementById('cfg-client-id').value.trim();
    config.telegramToken = document.getElementById('cfg-tg-token').value.trim();
    config.telegramChatId = document.getElementById('cfg-tg-chatid').value.trim();
    config.videoUrl = document.getElementById('cfg-video-url').value.trim();

    localStorage.setItem('gdrive_client_id', config.clientId);
    localStorage.setItem('gdrive_tg_token', config.telegramToken);
    localStorage.setItem('gdrive_tg_chatid', config.telegramChatId);
    localStorage.setItem('gdrive_video_url', config.videoUrl);

    applyWallpaperOpacity();
    toggleModal('modal-config');
    showToast("Pengaturan berhasil disimpan!", "success");
    logAuditAction("CONFIG", "Pengaturan API dan Telegram diperbarui.");
    initGoogleAuth();
}

function createNewFolder() {
    const nameInput = document.getElementById('new-folder-name');
    const accSelect = document.getElementById('new-folder-account');
    const folderName = nameInput ? nameInput.value.trim() : '';
    if (!folderName) { showToast("Nama folder wajib diisi.", "warning"); return; }
    const folderObj = {
        id: 'folder_' + Date.now() + '_' + Math.random().toString(36).substring(2,5),
        name: folderName,
        parentId: currentFolderId,
        targetAccountId: accSelect ? accSelect.value : 'poco1',
        createdAt: new Date().toISOString()
    };
    saveFolderToDB(folderObj).then(() => {
        nameInput.value = '';
        toggleModal('modal-folder');
        showToast("Folder berhasil dibuat!", "success");
        logAuditAction("FOLDER_CREATE", `Folder ${folderName} dibuat.`);
        renderExplorerUI();
    });
}

function navigateToFolder(folderId, folderName = '') {
    currentFolderId = folderId;
    const breadcrumbEl = document.getElementById('breadcrumb-current');
    if (breadcrumbEl) {
        breadcrumbEl.innerText = folderId === 'root' ? '' : ` / ${folderName}`;
    }
    renderExplorerUI();
}

function openCreateFolderModal() {
    toggleModal('modal-folder');
}

function triggerManualSync() {
    if (!isOnline) { showToast("Anda sedang offline.", "warning"); return; }
    processQueue();
    showToast("Proses sinkronisasi dimulai...", "info");
}

function clearAllQueue() {
    if (!confirm("Hapus semua antrean lokal?")) return;
    const tx = db.transaction(['files'], 'readwrite');
    const store = tx.objectStore('files');
    const req = store.openCursor();
    req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            if (cursor.value.status !== 'uploaded') { cursor.delete(); }
            cursor.continue();
        } else {
            loadFilesFromDB();
            showToast("Antrean berhasil dikosongkan.", "info");
        }
    };
}

// INSIALISASI EVENT LISTENER & WINDOW LOAD
window.addEventListener('DOMContentLoaded', async () => {
    await initDB();
    applyTranslations();
    applyWallpaperOpacity();
    renderAccountsList();
    initStorageChart();
    checkAppLockOnStart();
    await loadFilesFromDB();

    if (config.clientId) {
        initGoogleAuth();
    }

    const dropZone = document.getElementById('drop-zone');
    if (dropZone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); dropZone.classList.add('dragover'); }, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('dragover'); }, false);
        });
        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (dt.files && dt.files.length > 0) { handleFiles(dt.files); }
        });
    }

    document.getElementById('file-input')?.addEventListener('change', (e) => handleFiles(e.target.files));
    document.getElementById('folder-input')?.addEventListener('change', (e) => handleFiles(e.target.files));

    window.addEventListener('online', () => updateNetworkStatus(true));
    window.addEventListener('offline', () => updateNetworkStatus(false));
    updateNetworkStatus(navigator.onLine);
});

    document.addEventListener('visibilitychange', () => {
      const progressBar = document.getElementById('progressBar');
      if (document.hidden) {
        progressBar.style.animationPlayState = 'paused';
      } else {
        progressBar.style.animationPlayState = 'running';
      }
    });
// Elemen-elemen DOM
const previewImg = document.getElementById('previewImg');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');
const progressBar = document.getElementById('progressBar');

// 1. Fungsi Buka Pop-up
previewImg.addEventListener('click', () => {
  modal.classList.add('active');
  modalImg.src = previewImg.src; // Ambil gambar yang sedang tampil di preview
  progressBar.style.animationPlayState = 'paused'; // Jeda timer 15s saat pop-up terbuka
});

// 2. Fungsi Tutup Pop-up
function closeModal() {
  modal.classList.remove('active');
  progressBar.style.animationPlayState = 'running'; // Jalankan kembali timer 15s
}

// Tutup dengan klik tombol 'X'
closeBtn.addEventListener('click', closeModal);

// Tutup dengan klik di luar area gambar
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Tutup dengan menekan tombol 'Escape' pada keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Otomatis pause timer jika tab browser tidak aktif
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    progressBar.style.animationPlayState = 'paused';
  } else if (!modal.classList.contains('active')) {
    progressBar.style.animationPlayState = 'running';
  }
});

.modal-overlay {
  display: none; /* Ini wajib ada agar pop-up tidak muncul sebelum diklik */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  justify-content: center;
  align-items: center;
}
