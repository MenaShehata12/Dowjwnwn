let deferredPrompt; // Allows to show the install prompt

window.addEventListener("beforeinstallprompt", (e) => {
    const addModal = document.getElementById('install_modal');
    const addBtn = document.getElementById('install_button');
    // Prevent Chrome 76 and earlier from automatically showing a prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the install button if cookie expired
    if (document.cookie.indexOf('installModalClosed=1') != -1) {
        console.log('Cookie is present');
    } else {
        addModal.classList.remove('hidden');
    }

    addBtn.addEventListener('click', (e) => {
        // show prompt
        deferredPrompt.prompt();
        // wait user to respond
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Installed')

            } else {
                console.log('dismissed')
            }
            deferredPrompt = null;
        });
    });
});


window.addEventListener("appinstalled", evt => {
    console.log("appinstalled fired", evt);
});


function WriteCookie() {
    var now = new Date();
    now.setTime(now.getTime() + 86400e3);
    document.cookie = 'installModalClosed=1; expires=' + now.toUTCString() + ';';
}