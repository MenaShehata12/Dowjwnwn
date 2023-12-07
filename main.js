let token = '';
let defaultHtml = null;
let defaultHtml2 = null;

defaultHtml = $('.loadwait').html()


function onSubmit(tokenString) {
    $(".loadwait").html(defaultHtml)
    localStorage.setItem('_token', tokenString)
    document.querySelector('#submit').click()
}

function onClose() {
    defaultHtml = $('.loadwait').html()
    $('.loadwait .animate-bounce').attr('id', 'loader-animation')
    $('#loader-animation').removeClass('animate-bounce')

    if (defaultHtml2 != null) {
        $(".loadwait").html(defaultHtml2)
    } else {
        $('#loader-animation').html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="200px" height="70px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">' +
            '<rect x="17.5" y="30" width="15" height="40" fill="#3b82f6">' +
            '<animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>' +
            '<animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s"></animate>' +
            '</rect>' +
            '<rect x="42.5" y="30" width="15" height="40" fill="#3b82f6">' +
            '<animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>' +
            '<animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s"></animate>' +
            '</rect>' +
            '<rect x="67.5" y="30" width="15" height="40" fill="#3b82f6">' +
            '<animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="20.999999999999996;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>' +
            '<animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="58.00000000000001;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"></animate>' +
            '</rect>' +
            '</svg>')
    }

    if (defaultHtml2 == null) {
        defaultHtml2 = $(".loadwait").html()
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const pasteElement = document.getElementById("paste");
    const inputElement = document.getElementById("url");

    let onlyClear = false;

    if (!navigator.clipboard) {
        onlyClear = true;
    }

    if (onlyClear || inputElement.value.length) {
        pasteElement.classList.replace("paste", "clear");
        pasteElement.innerHTML = "Clear";
    }

    pasteElement.classList.remove("disabled");

    const showAdsModal = function () {
            let adsModal = $('#ads-modal');
        if (window.adsbygoogle.loaded === true) {
            adsModal.removeClass('hidden');
            const modalOverlay = document.createElement('div')
            modalOverlay.addAttribute = 'modal-backdrop'
            modalOverlay.id = 'modal-overlay'
            modalOverlay.className = 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
            document.body.appendChild(modalOverlay)

            if (!document.querySelector('#ads-modal-ins-el')) {

                let adUnitID = 4842076879;
                let adClient = 'ca-pub-5982714658312407';

                if (window.ads) {
                    const ads = JSON.parse(window.ads)
                    adClient = ads.client
                    adUnitID = ads.slot3;

                    const adsModalIns = document.querySelector('#ads-modal-ins')
                    const ele = document.createElement('ins');
                    ele.style.display = 'block';
                    ele.className = 'adsbygoogle';
                    ele.setAttribute('data-ad-client', adClient);
                    ele.setAttribute('data-ad-slot', adUnitID);
                    ele.setAttribute('data-ad-format', 'auto');
                    ele.setAttribute('data-full-width-responsive', 'true');
                    ele.setAttribute('id', 'ads-modal-ins-el');
                    adsModalIns.appendChild(ele);

                    setTimeout(() => {
                        (window.adsbygoogle || []).push({});
                    }, 500);
                }
            }
        }
    }

    $('.ads-modal-close').on('click', function () {
        let adsModal = $('#ads-modal');
        document.body.removeChild(document.getElementById('modal-overlay'))
        adsModal.addClass('hidden')
    })

    pasteElement.addEventListener("click", async function (e) {
        if (onlyClear) {
            inputElement.value = "";
            pasteElement.classList.add("disabled");
            inputElement.focus();
            return;
        }

        let actionPaste = pasteElement.classList.contains("paste");

        if (!actionPaste) {
            pasteElement.innerHTML = "Paste";
            pasteElement.classList.replace("clear", "paste");
            inputElement.value = "";

            return;
        }
        const queryOpts = {
            name: "clipboard-read",
            allowWithoutGesture: false,
        };
        const permissionStatus = await navigator.permissions.query(queryOpts);

        permissionStatus.onchange = async () => {
            if (permissionStatus.state === "granted") {
                let text = await navigator.clipboard.readText();
                inputElement.value = text;
            }
        };

        if (permissionStatus.state === "denied") {
            return;
        }

        let text = await navigator.clipboard.readText();

        inputElement.value = text;

        if (text.length) {
        } else {
            return;
        }
        pasteElement.classList.replace("paste", "clear");
        pasteElement.innerHTML = "Clear";
    });

    inputElement.addEventListener('input', function (e) {
        let value = inputElement.value.trim();

        if (onlyClear) {
            if (value.length === 0) {
                pasteElement.classList.add("disabled");
            } else {
                pasteElement.classList.remove("disabled");
            }

            return;
        }

        if (value.length === 0) {
            pasteElement.innerHTML = "Paste";
            pasteElement.classList.replace("clear", "paste");
        } else {
            pasteElement.classList.replace("paste", "clear");
            pasteElement.innerHTML = "Clear";
        }
    });

    const regex = /^((https|http)?:\/\/(?:www\.)?instagram\.com(\/[A-Za-z0-9_@./#&+-]*)?\/(p|tv|reel|stories)\/([^/?#&]+)).*/
    const downloadAnotherVideo = document.querySelector('#download-other-video')
    const form = document.querySelector('#form')
    const url = document.querySelector('.url')
    const emsg = document.querySelector('#ivalidstatus')
    const preload = document.querySelector('#preload')
    const submit = document.querySelector('#submit')
    const results = $('#results')
    const partnerTiktok = document.querySelector('#partner-tiktok')
    const partnerFacebook = document.querySelector('#partner-facebook')
    const partnerYoutube = document.querySelector('#partner-youtube')
    const loadWait = $(".loadwait");

    if (downloadAnotherVideo) {
        downloadAnotherVideo.addEventListener('click', function () {
            addAnalytics('navigation', 'dl_other_file_btn')
        });
    }

    const showError = function () {
        emsg.classList.remove("hidden")
        emsg.classList.add("show")
    }

    const hideError = function () {
        emsg.classList.remove("show")
        emsg.classList.add("hidden")
    }

    const hidePartners = function () {
        let partners = document.querySelectorAll('.partners')
        partners.forEach((item, index) => {
            partners[index].classList.remove('show')
            partners[index].classList.add('hidden')
        })
    }

    url.addEventListener('input', function () {
        hidePartners();
        hideError();
    });

    form.addEventListener('submit', function (e) {
        emsg.classList.remove("show")
        emsg.classList.add("hidden")
        hidePartners();
        e.preventDefault();
        let inputValue = '';

        inputValue = url.value ? url.value.trim() : '';

        if (inputValue.indexOf("?") > 0) {
            inputValue = inputValue.substring(0, inputValue.indexOf("?"));
        }
        if (!inputValue || inputValue.length == 0) {
            showError();
            addAnalytics("submit_request", "not_ig_url", "empty");
            e.preventDefault()
            return false;
        }

        if (inputValue.indexOf('instagram.com') > 0 && !inputValue.endsWith('/')) {
            inputValue = `${inputValue}/`
        }

        if (isIgUrl(inputValue) || isUsernameUrl(inputValue) || isProfileUrl(inputValue)) {
            hideError();
            submitForm();
            e.preventDefault();

            return false;
        }

        if (isPartnerLink(inputValue)) {
            e.preventDefault();

            return false;
        }

        showError();

        addAnalytics("submit_request", "not_ig_url", inputValue);
        e.preventDefault();

        return false;
    })

    const isIgUrl = function (s) {
        return regex.test(s);
    }

    const isUsernameUrl = function (s) {

        if (s.includes('instagram.com')) {

            return false;
        }
        if (s.endsWith('/')) {
            s = s.slice(0, -1)
        }

        s = s.replace('@', '')

        let regex = /^[A-Za-z0-9_.]{2,30}$/;

        return regex.test(s);
    }

    const isProfileUrl = function (s) {
        let regex = /^(https|http)?:\/\/(?:www\.)?instagram\.com(\/[A-Za-z0-9_@./#&+-].+\/$)/;

        return regex.test(s);
    }

    const isPartnerLink = function (inputValue) {
        if (inputValue.includes('tiktok')) {
            partnerTiktok.classList.remove('hidden')
            partnerTiktok.classList.add('show')
            addAnalytics("submit_request", "not_ig_url", inputValue);

            return true;
        } else if (inputValue.includes('facebook')) {
            partnerFacebook.classList.remove('hidden')
            partnerFacebook.classList.add('show')
            addAnalytics("submit_request", "not_ig_url", inputValue);

            return true;

        } else if (inputValue.includes('youtube')) {
            partnerYoutube.classList.remove('hidden')
            partnerYoutube.classList.add('show')
            addAnalytics("submit_request", "not_ig_url", inputValue);

            return true;
        }

        return false;
    }
    window.clikOtherDownload = () => {
        showAdsModal()
        document.querySelector('.ads-modal-close').addEventListener('click', () => {
            window.location.reload()
        })
    }

    const insertTopAds = function () {
        if (window.adsbygoogle.loaded === true) {
            const adClient = 'ca-pub-5982714658312407';

            const parent = document.getElementById('adsBlock');
            const ele = document.createElement('ins');
            ele.style.display = 'block';
            ele.className = 'adsbygoogle';
            ele.setAttribute('data-ad-client', adClient);
            ele.setAttribute('data-ad-slot', '5639905800');
            ele.setAttribute('data-ad-format', 'auto');
            ele.setAttribute('data-full-width-responsive', 'true');
            parent.appendChild(ele);

            setTimeout(() => {
                (window.adsbygoogle || []).push({});
            }, 500);
        }
    }

    const insertUnderResultAd = function () {
        if (window.adsbygoogle.loaded === true) {
            const adClient = 'ca-pub-5982714658312407';

            const underformParent = document.querySelector('#adsBlock-under-result')
            const ad = document.createElement('ins')
            ad.style.display = 'block';
            ad.className = 'adsbygoogle';
            ad.setAttribute('data-ad-client', adClient);
            ad.setAttribute('data-ad-slot', '2394422602');
            ad.setAttribute('data-ad-format', 'auto');
            ad.setAttribute('data-full-width-responsive', 'true');
            underformParent.appendChild(ad);

            setTimeout(() => {
                (window.adsbygoogle || []).push({});
            }, 500);
        }
    }

    function checkSuccessResponse() {
        let existCondition = setInterval(function () {
            let postType = $('#posttype');

            if (postType.length) {

                addAnalytics('results_show', postType.attr("data-posttype"), '')

                let apiVersion = $("#api_version")

                if (apiVersion.length) {
                    if (postType.attr("data-posttype") !== "PrivateAPI") {
                        addAnalytics('api_version', apiVersion.attr("data-api"), '')
                    }
                }
                clearInterval(existCondition);
            }
        }, 100);
    }

    results.on("click", "#download-btn", function (event) {
        event.preventDefault();
        const mediaType = $(this).attr("data-mediatype");
        addAnalytics('Conversion', 'Download', mediaType)

        // popunder
        const downloadLink = $(this).attr("href");
        // setTimeout(() => {
            document.location = downloadLink;
        // }, 500);

        showAdsModal();
    });

    let insertedAd = false;
    const submitForm = function () {
        let inputValue = url.value.trim();
        results.html('');
        loadWait.removeClass("hidden");
        loadWait.addClass("flex");

        if (inputValue.indexOf("?") > 0) {
            inputValue = inputValue.substring(0, inputValue.indexOf("?"));
        }

        if (inputValue.indexOf('instagram.com') > 0 && !inputValue.endsWith('/')) {
            inputValue = `${inputValue}/`
        }

        let isUsername = isUsernameUrl(inputValue);
        let profileUrl = isProfileUrl(inputValue);

        if (isUsername) {
            let newValue = inputValue.replace('@', '');
            if (newValue.endsWith('/')) {
                newValue = newValue.slice(0, -1)
            }
            inputValue = 'https://www.instagram.com/' + newValue;
        }

        if (inputValue && (isIgUrl(inputValue) || isUsername || profileUrl)) {
            addAnalytics("submit_request", "is_ig_url", '');
            if (localStorage.getItem('_token')) {
                token = localStorage.getItem('_token')
                localStorage.removeItem('_token')
            }

            $.ajax({
                type: "POST",
                url: window.api_url,
                data: {
                    url: inputValue,
                    lang_code: current_lang,
                    token: token
                },
                success: function (result) {

                    loadWait.addClass("hidden");
                    $("#results").html(result);

                    if (downloadAnotherVideo) {
                        const downloadOtherVideoWrapper = document.querySelector('#download-other-video-wrapper')
                        downloadOtherVideoWrapper.classList.remove('hidden');
                        const adUnderformWrapper = document.querySelector('#adsBlock-under-result')
                        adUnderformWrapper.classList.remove('hidden');
                    }

                    addAnalytics('API', 'Success')
                    addAnalytics('submitted_url', 'success_url', String(inputValue))

                    $('#form-wrapper').hide();
                    if (!insertedAd) {
                        insertTopAds();
                        insertUnderResultAd()
                        insertedAd = true;
                    };

                    $("html, body").animate({
                        scrollTop: $("#adsBlock").offset().top
                    }, 800);

                    checkSuccessResponse();
                },
                error: function (error) {
                    addAnalytics('API', 'Failed', "")
                    addAnalytics('submitted_url', 'failed_url', String(inputValue));
                    $(".apierror").removeClass("hidden");
                    $(".apierror").show();
                    loadWait.addClass("hidden");
                    insertedAd = false;
                },
            });
        } else {
            loadWait.addClass("hidden");
            $(".emsg").removeClass("hidden");
            $(".emsg").show();
            submit.attr("disabled", "disabled");
        }
    }
})

