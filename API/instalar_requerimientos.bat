@echo off
title Instalador de Requerimientos API Nodejs
echo ============================================
echo    Iniciando instalacion de paquetes...
echo ============================================

node -v >nul 2>&1
if errorlevel 1 (
    echo Node.js no esta instalado. Por favor instalalo desde:
    echo https://nodejs.org
    pause
    exit /b
)

npm -v >nul 2>&1
if errorlevel 1 (
    echo npm no esta instalado correctamente. Revisa tu instalacion de Node.js.
    pause
    exit /b
)

echo Instalando paquetes npm: express cors dotenv helmet mysql2
npm install express cors dotenv helmet mysql2

if %errorlevel% neq 0 (
    echo Hubo un error durante la instalacion de paquetes.
    pause
    exit /b
)

echo.
echo ============================================
echo     Instalacion completada con exito!
echo ============================================
pause
