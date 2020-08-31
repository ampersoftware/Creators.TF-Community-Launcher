const content = document.getElementById("content");
const contentDummy = document.getElementById("contentdummy");
const titleImage = document.getElementById("title-image");
const text = document.getElementById("content-text");
const version = document.getElementById("version-text");

const removeButton = document.getElementById("remove-mod");

const updateButton_Download = document.getElementById("update-button-download");
const updateButton_Downloading = document.getElementById(
    "update-button-downloading"
);
const updateButton_Update = document.getElementById("update-button-update");
const updateButton_Updated = document.getElementById("update-button-updated");

const website = document.getElementById("socialMediaWebsite");
const github = document.getElementById("socialMediaGithub");
const twitter = document.getElementById("socialMediaTwitter");
const discord = document.getElementById("socialMediaDiscord");
const instagram = document.getElementById("socialMediaInstagram");
const serverlist = document.getElementById("serverlist");

website.onclick = () => window.ipcRenderer.send("Visit-Mod-Social", "website");
github.onclick = () => window.ipcRenderer.send("Visit-Mod-Social", "github");
twitter.onclick = () => window.ipcRenderer.send("Visit-Mod-Social", "twitter");
instagram.onclick = () =>
    window.ipcRenderer.send("Visit-Mod-Social", "instagram");
discord.onclick = () => window.ipcRenderer.send("Visit-Mod-Social", "discord");

const installButton = document.getElementById("install-play-update");
document.onload = () => {
    installButton.disabled = true;
};

function OnClick_Mod(data) {
    window.log.info("Mod entry clicked");

    content.style.backgroundImage = `url("${"./" + data.backgroundimage}")`;
    titleImage.src = data.titleimage;
    text.innerText = data.contenttext;
    content.style.borderColor = data.bordercolor;
    content.style.backgroundPositionX = data.backgroundposX;
    content.style.backgroundPositionY = data.backgroundposY;

    contentDummy.remove();
    content.style.display = "block";
    content.style.backgroundBlendMode = "soft-light";

    installButton.style.background = "";
    installButton.style.backgroundColor = "grey";
    installButton.style.color = "black";
    installButton.innerText = "LOADING...";
    installButton.disabled = true;

    website.style.display = data.website != "" ? "block" : "none";
    github.style.display = data.github != "" ? "block" : "none";
    twitter.style.display = data.twitter != "" ? "block" : "none";
    instagram.style.display = data.instagram != "" ? "block" : "none";
    discord.style.display = data.discord != "" ? "block" : "none";

    // If the mod has a server list, just fill the "serverlist" attribute
    // in mods.json with anything. If it doesn't, leave it blank.
    // This was made to avoid the server list button to appear on Gman's
    // announcer page.
    serverlist.style.display = data.serverlist != "" ? "block" : "none";

    //Get the current state of this mod to set the name of the button correctly.
    //To do that, we tell the main process to set the current mod and set that up.
    window.ipcRenderer.send("SetCurrentMod", data.name);
}

updateButton_Download.onclick = (downloadUpdate) => {
    window.ipcRenderer.send("download_update");
    window.log.info(
        "User chose to download the update. Downloading it." + downloadUpdate
    );
};

updateButton_Update.onclick = (closeProgramAndUpdate) => {
    window.ipcRenderer.send("restart_app");
    window.log.info(
        "The launcher was restarted to update" + closeProgramAndUpdate
    );
};

window.ipcRenderer.on("update_not_available", () => {
    window.ipcRenderer.removeAllListeners("update_not_available");
    updateButton_Updated.classList.remove("hidden");
    updateButton_Download.remove();
    updateButton_Downloading.remove();
    updateButton_Update.remove();
    window.log.info("No update available... Sad!");
});

window.ipcRenderer.on("update_available", () => {
    window.ipcRenderer.removeAllListeners("update_available");
    updateButton_Updated.remove();
    updateButton_Download.classList.remove("hidden");
    window.log.info(
        "An update is available. Waiting for user's input to actually download it."
    );
});

window.ipcRenderer.on("update_downloading", () => {
    window.ipcRenderer.removeAllListeners("update_downloading");
    updateButton_Download.remove();
    updateButton_Downloading.classList.remove("hidden");
    window.log.info("Downloading update");
});

window.ipcRenderer.on("update_downloaded", () => {
    window.ipcRenderer.removeAllListeners("update_downloaded");
    updateButton_Downloading.remove();
    updateButton_Update.classList.remove("hidden");
    window.log.info(
        "The update was downloaded and will be installed on restart. Waiting for user's input."
    );
});

document.getElementById("settings-button").addEventListener("click", () => {
    window.ipcRenderer.send("SettingsWindow", "");
});

document.getElementById("patchnotes-button").addEventListener("click", () => {
    window.ipcRenderer.send("PatchNotesWindow", "");
});

document.getElementById("serverlist").addEventListener("click", () => {
    window.ipcRenderer.send("ServerListWindow", "");
});

installButton.addEventListener("click", () => {
    //Do NOT use e
    installButton.innerText = "STARTING...";
    installButton.disabled = true;
    window.ipcRenderer.send("install-play-click", "");
});

window.ipcRenderer.on("GetCurrentModVersion-Reply", (_, arg) => {
    version.innerText = arg;
});

window.ipcRenderer.on("InstallButtonName-Reply", (_, arg) => {
    arg = arg.toLowerCase();
    installButton.innerText = arg.toUpperCase();
    if (arg != "installed" && arg != "internal error") {
        installButton.disabled = false;
    }

    switch (arg) {
        case "installed":
            installButton.style.background =
                "linear-gradient(to right, #009028 25%, #007520 75%)"; //Green (light-to-dark)
            installButton.style.color = "white";
            removeButton.style.display = "block";
            break;
        case "install":
            installButton.style.background = "";
            installButton.style.backgroundColor = "#FF850A";
            installButton.style.color = "white";
            removeButton.style.display = "none";
            break;
        case "update":
            installButton.style.background =
                "linear-gradient(to left, #1A96FF 25%, #1A70FF 75%)"; //Blue (dark-to-light)
            installButton.style.color = "white";
            removeButton.style.display = "block";
            break;
        case "internal error":
            installButton.style.background = "";
            installButton.style.backgroundColor = "#B51804";
            installButton.style.color = "white";
            removeButton.style.display = "none";
            break;
        default:
            installButton.style.background = "";
            installButton.style.backgroundColor = "grey";
            installButton.style.color = "black";
            removeButton.style.display = "none";
            break;
    }
});

window.ipcRenderer.on("FakeClickMod", (_, moddata) => {
    OnClick_Mod(moddata);
});

removeButton.addEventListener("click", () => {
    window.ipcRenderer.send("Remove-Mod", "");
});
