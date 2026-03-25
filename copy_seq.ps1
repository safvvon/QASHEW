New-Item -ItemType Directory -Force -Path "scrolly-app\public\sequence"
$files = Get-ChildItem "ezgif-frame-*.jpg" | Sort-Object Name
$i = 0
foreach ($file in $files) {
    if ($file -is [System.IO.FileInfo]) {
        $num = "{0:D4}" -f $i
        Copy-Item $file.FullName "scrolly-app\public\sequence\frame_$num.jpg"
        $i++
    }
}
