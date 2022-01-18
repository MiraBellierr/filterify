const page = document.body;
let hide = false;
let elements = [];
let clickedUsername;
let hideInterval = null;

// double click the name
page.ondblclick = e => {
    if (e.target.className === "chat-author__display-name") {
        clickedUsername = e.target.textContent;
        hide = !hide;
        findComments();
        hideComments();
    }
}

function findComments() {
    const chatPages = page.getElementsByClassName("Layout-sc-nxg1ff-0");
    let textboxes = [...chatPages].filter(element => element.classList.length === 1);
    textboxes = textboxes.filter(el => el.getElementsByClassName("chat-author__display-name"));

    textboxes.forEach(el => {
        const username = el.textContent.split(":")[0];

        if (username !== clickedUsername && el.textContent !== "Followers-Only Chat" && el.textContent !== 0 && !el.textContent.includes("Hype TrainSub, gift, or use Bits")) {
            elements.push(el);
        }
    });

    const replyText = page.getElementsByClassName("Layout-sc-nxg1ff-0 hKyFMk chat-line__message-highlight");
    [...replyText].forEach(el => {
        if (el.textContent === "") {
            elements.push(el);
        }
    });

    const chatLine = page.getElementsByClassName("chat-line__message");
    [...chatLine].forEach(el => {
        if (!el.textContent.startsWith(clickedUsername)) {
            elements.push(el);
        }
    });
}


function hideComments() {
    if (hide) {
        console.log("Comments are hidden");
        hideInterval = setInterval(() => {
            findComments();
            elements.forEach(el => el.style.display = "none");
        }, 1000)
    }
    else {
        console.log("Revert back");
        clearInterval(hideInterval);
        hideInterval = null;
        elements.forEach(el => el.style.display = "block");
        elements = [];
    }
}