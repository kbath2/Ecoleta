function populateUFs() {
    const ufSelect = document.querySelector("[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += ` <option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city")
    const stateInput = document.querySelector("[name=state")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += ` <option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

// JS do form de Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    // add ou remover uma class
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
        // se já tiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)

        selectedItems = filteredItems
    } else {
        // se nao tiver selecionado, adcionar a seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}