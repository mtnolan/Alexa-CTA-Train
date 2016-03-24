$strDirectory = 'C:\Code\Github\Alexa-CTA-Train'

Add-Type -Assembly System.IO.Compression.FileSystem
   $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal

If (Test-Path "$strDirectory\index.zip"){   remove-item "$strDirectory\index.zip"}
   [System.IO.Compression.ZipFile]::CreateFromDirectory("$strDirectory\index","$strDirectory\index.zip", $compressionLevel, $false)