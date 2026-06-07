#!/bin/bash
set -euo pipefail

# Build AppImage package for proton-drive-sync
#
# Required environment variables:
#   VERSION     - Package version (e.g., 1.0.0)
#   ARCH        - Architecture (x86_64 or aarch64)
#   BINARY_PATH - Path to the binary
#   PRERELEASE  - "true" or "false"

# Validate required environment variables
: "${VERSION:?VERSION is required}"
: "${ARCH:?ARCH is required}"
: "${BINARY_PATH:?BINARY_PATH is required}"
: "${PRERELEASE:?PRERELEASE is required}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Determine output filename based on prerelease status
if [ "${PRERELEASE}" = "true" ]; then
	OUTPUT_NAME="Proton_Drive_Sync-Prerelease-${VERSION}-${ARCH}.AppImage"
else
	OUTPUT_NAME="Proton_Drive_Sync-${VERSION}-${ARCH}.AppImage"
fi

echo "Building AppImage: ${OUTPUT_NAME}"

# Create AppDir structure
APPDIR="AppDir"
rm -rf "${APPDIR}"
mkdir -p "${APPDIR}/usr/bin"

# Copy binary
cp "${BINARY_PATH}" "${APPDIR}/usr/bin/proton-drive-sync"
chmod +x "${APPDIR}/usr/bin/proton-drive-sync"

# Copy desktop file
cp "${REPO_ROOT}/packaging/appimage/proton-drive-sync.desktop" "${APPDIR}/proton-drive-sync.desktop"

# Copy icon
cp "${REPO_ROOT}/src/dashboard/assets/icon.svg" "${APPDIR}/proton-drive-sync.svg"

# Create AppRun symlink
ln -sf usr/bin/proton-drive-sync "${APPDIR}/AppRun"

# Download appimagetool if not present
APPIMAGETOOL="appimagetool-${ARCH}.AppImage"
if [ ! -f "${APPIMAGETOOL}" ]; then
	echo "Downloading appimagetool for ${ARCH}..."
	curl -fsSL -o "${APPIMAGETOOL}" \
		"https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-${ARCH}.AppImage"
	chmod +x "${APPIMAGETOOL}"
fi

# Build AppImage
ARCH="${ARCH}" ./"${APPIMAGETOOL}" "${APPDIR}" "${OUTPUT_NAME}"

echo "Successfully built: ${OUTPUT_NAME}"
