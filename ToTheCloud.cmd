powershell.exe -executionpolicy bypass -File Zipit.ps1
aws lambda update-function-code --function-name AlexaCTA --zip-file fileb://index.zip