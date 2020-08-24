# OverprimeLauncher

/_ THIS IS WHAT I NEED TO DO FOR MY APP _/
/\*

1. Create the window.chromeframe
   I need to define the window paramaters
   This project is using a static H&W
   Allow: Moveable, NodeIntegrations, DevConsole,
   Deny: Frame, Resize, Devconsole(onDist)

2. On app ready.
   Check: App Updates, Listen for button to ini Download.

3. On Download press, dialog.showOpen for user to select Dir. Change button to Downloading.

4. When Dir is chosen we save Selected Dir to a variable and then fs.writeFileSync InstallPath.txt with Path Var.

5. after download run exe from path.join(userPath, OP_Combined.exe)

6. after install we need to delete Downloaded files to remove unnecessary file storage Update Button to play.

7. locate OP_win64_shipping.exe from path.join(userpath + Overprime/content/bin/pkg...) to allow user to launch the game.

Need to add later Check isInstalled?
