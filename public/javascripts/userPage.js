/**
 * This function redirects the page to the purchase page.
 */
function redirectToPurchasePage() {
    let current = window.location.href;
    current = current.split('/user')[0];
    window.location.href = `${current}/purchase`;
}

/**
 * The aim of this function is to redirect the pagefrom '/user' to '/data'.
 *
 * @param deviceNum the device number of the target device
 */
function redirectToDataPage(deviceNum) {
    let currentURL = window.location.href;

    currentURL = currentURL.split('/user')[0];

    let url = `${currentURL}/data?deviceNum=${deviceNum}&user=` + document.getElementById('userID').innerText;

    window.location.href = url;
}

/**
 * This function helps the user to change the device name.
 *
 * @param deviceNum the device number
 * @param deviceName the new name of the device
 * @param currentName the current name of the device
 */
function changeTheDeviceName(deviceNum, deviceName, currentName) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                document.getElementById(currentName).innerText = deviceName;
            } else {
                alert('Failed to change the device name!');
            }
        }
    };

    let data = { deviceNum: deviceNum, deviceName: deviceName, currentName: currentName };

    xhr.open('POST', window.location.href);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}