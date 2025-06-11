const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// renk kodlar,
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// dizinler
const frontendDir = path.join(__dirname, 'frontend');
const backendDir = path.join(__dirname, 'backend');

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkAndInstallDependencies(dir, name) {
  log(`\n📂 ${name} klasörü kontrol ediliyor...`, colors.cyan);
  
  if (!fs.existsSync(dir)) {
    log(`❌ ${name} klasörü bulunamadı: ${dir}`, colors.yellow);
    return false;
  }
  
  // node_modules kontrolü
  const nodeModulesPath = path.join(dir, 'node_modules');
  const packageJsonPath = path.join(dir, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    log(`❌ ${name} klasöründe package.json bulunamadı!`, colors.yellow);
    return false;
  }
  
  if (!fs.existsSync(nodeModulesPath)) {
    log(`🔍 ${name} için node_modules bulunamadı. Paketler kuruluyor...`, colors.yellow);
    
    try {
      log(`⚙️ ${name} için npm install çalıştırılıyor...`, colors.blue);
      
      const isWindows = process.platform === 'win32';
      const npmCmd = isWindows ? 'npm.cmd' : 'npm';
      
      execSync(`${npmCmd} install`, { 
        cwd: dir, 
        stdio: 'inherit',
        shell: true
      });
      
      log(`✅ ${name} için paketler başarıyla kuruldu!`, colors.green);
    } catch (error) {
      log(`❌ ${name} için paket kurulumu başarısız: ${error.message}`, colors.yellow);
      return false;
    }
  } else {
    log(`✅ ${name} için node_modules zaten mevcut.`, colors.green);
  }
  
  return true;
}

function startApplications() {
  log('\n🚀 Uygulamalar başlatılıyor...', colors.bright + colors.magenta);
  
  const isWindows = process.platform === 'win32';
  const npmCmd = isWindows ? 'npm.cmd' : 'npm';
  
  const backend = spawn(npmCmd, ['run', 'dev'], { 
    cwd: backendDir,
    shell: true
  });
  
  backend.stdout.on('data', (data) => {
    process.stdout.write(`${colors.cyan}[Backend] ${colors.reset}${data}`);
  });
  
  backend.stderr.on('data', (data) => {
    process.stderr.write(`${colors.yellow}[Backend Error] ${colors.reset}${data}`);
  });
  
  try {
    const packageJsonPath = path.join(frontendDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts || {};
    
    const possibleCommands = ['start', 'dev', 'serve', 'develop'];
    let frontendCommand = null;
    
    for (const cmd of possibleCommands) {
      if (scripts[cmd]) {
        frontendCommand = cmd;
        break;
      }
    }
    
    if (!frontendCommand) {
      const availableScripts = Object.keys(scripts);
      if (availableScripts.length > 0) {
        log(`⚠️ Frontend için bilinen start komutu bulunamadı. Mevcut komutlar: ${availableScripts.join(', ')}`, colors.yellow);
        log(`🔍 İlk komut '${availableScripts[0]}' kullanılacak`, colors.blue);
        frontendCommand = availableScripts[0];
      } else {
        throw new Error('Frontend için hiçbir script komutu bulunamadı');
      }
    }
    
    log(`🚀 Frontend '${frontendCommand}' komutu ile başlatılıyor...`, colors.magenta);
    
    setTimeout(() => {
      const frontend = spawn(npmCmd, ['run', frontendCommand], { 
        cwd: frontendDir,
        shell: true
      });
      
      frontend.stdout.on('data', (data) => {
        process.stdout.write(`${colors.magenta}[Frontend] ${colors.reset}${data}`);
      });
      
      frontend.stderr.on('data', (data) => {
        process.stderr.write(`${colors.yellow}[Frontend Error] ${colors.reset}${data}`);
      });
      
      frontend.on('close', (code) => {
        if (code !== 0) {
          log(`❌ Frontend ${code} koduyla kapandı`, colors.yellow);
        }
        backend.kill();
        process.exit();
      });
      
    }, 2000);
  } catch (error) {
    log(`❌ Frontend başlatılamadı: ${error.message}`, colors.yellow);
    log('ℹ️ Frontend klasöründe manuel olarak başlatmanız gerekebilir', colors.blue);
  }
  
  backend.on('close', (code) => {
    if (code !== 0) {
      log(`❌ Backend ${code} koduyla kapandı`, colors.yellow);
    }
    process.exit();
  });
  
  process.on('SIGINT', () => {
    log('\n👋 Uygulamalar kapatılıyor...', colors.bright);
    backend.kill();
    process.exit();
  });
}

// main işlem
async function main() {
  log('🔍 Proje kontrol ediliyor...', colors.bright + colors.blue);
  
  // Backend kontrol et
  const backendReady = checkAndInstallDependencies(backendDir, 'Backend');
  
  // Frontend kontrol et
  const frontendReady = checkAndInstallDependencies(frontendDir, 'Frontend');
  
  // Her ikisi de hazırsa başlat
  if (backendReady && frontendReady) {
    startApplications();
  } else {
    log('\n❌ Bazı bileşenler hazır değil, uygulama başlatılamıyor.', colors.yellow);
    process.exit(1);
  }
}

// Çalıştır
main().catch(err => {
  log(`❌ Hata: ${err.message}`, colors.yellow);
  process.exit(1);
});