

Add-Type -Assembly System.IO.Compression.FileSystem
   $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal

If (Test-Path "C:\Users\mnolan\Desktop\cta train tracker\index.zip"){   remove-item "C:\Users\mnolan\Desktop\cta train tracker\index.zip"}
   [System.IO.Compression.ZipFile]::CreateFromDirectory("C:\Users\mnolan\Desktop\cta train tracker\index","C:\Users\mnolan\Desktop\cta train tracker\index.zip", $compressionLevel, $false)