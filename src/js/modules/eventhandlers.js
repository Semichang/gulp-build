
export function BurgerActive() {
    const menu = document.querySelector(".menu__body")
    const buttonMenu = document.querySelector(".menu__icon")
    if (menu && buttonMenu) {
        buttonMenu.addEventListener("click", () => {
            menu.classList.toggle("_active")
            buttonMenu.classList.toggle("_active")
        })
    }
}

export function ScrollToAllDocument() {
    elementsWithScrolling = document.body.querySelectorAll('[data-goto]')
}