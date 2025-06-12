# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_data_files, collect_dynamic_libs, collect_submodules

datas = [('whisper-tiny-en-openvino', 'whisper-tiny-en-openvino')]
datas += [('playlists.json', '.')]
datas += [('all-MiniLM-L6-v2-openvino', 'all-MiniLM-L6-v2-openvino')]
binaries = []
hiddenimports = ['uvicorn.lifespan.off','uvicorn.lifespan.on','uvicorn.lifespan',
'uvicorn.protocols.websockets.auto','uvicorn.protocols.websockets.wsproto_impl',
'uvicorn.protocols.websockets_impl','uvicorn.protocols.http.auto',
'uvicorn.protocols.http.h11_impl','uvicorn.protocols.http.httptools_impl',
'uvicorn.protocols.websockets','uvicorn.protocols.http','uvicorn.protocols',
'uvicorn.loops.auto','uvicorn.loops.asyncio','uvicorn.loops.uvloop','uvicorn.loops',
'uvicorn.logging',
    'live_match_api',]

# Collect data files, dynamic libraries, and submodules for openvino_genai
datas += collect_data_files('openvino_genai')
datas += collect_data_files('optimum.intel.openvino')
binaries += collect_dynamic_libs('openvino_genai')
hiddenimports += collect_submodules('openvino_genai')
hiddenimports += collect_submodules('optimum.intel.openvino')

datas += collect_data_files('openvino')
binaries += collect_dynamic_libs('openvino')
hiddenimports += collect_submodules('openvino')

# Collect dynamic libraries for openvino_tokenizers
binaries += collect_dynamic_libs('openvino_tokenizers')

# Ensure the _internal directory is included
datas += collect_data_files('_internal')

# Ensure PyTorch is included
hiddenimports += collect_submodules('torch')

# Ensure SciPy is included
hiddenimports += collect_submodules('scipy')
hiddenimports += ['scipy.sparse.linalg.dsolve.linsolve']
hiddenimports += ['scipy.sparse.csgraph._validation']

# Collect dynamic libraries for SciPy
binaries += collect_dynamic_libs('scipy')

dll_path = r'C:\Windows\System32'
binaries += [
    (os.path.join(dll_path, 'vcruntime140.dll'), '.'),
    (os.path.join(dll_path, 'msvcp140.dll'), '.'),
    (os.path.join(dll_path, 'vcruntime140_1.dll'), '.'),
]

a = Analysis(
    ['live_match_api.py'],
    pathex=['.'],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
)

pyz = PYZ(a.pure, a.zipped_data)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='live_match_api',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
)