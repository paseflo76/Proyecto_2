const zapatillas = [
  {
    id: 1,
    img: 'assets/foto16.png',
    marca: 'Nike Original',
    modelo: 'Air Max',
    precio: 120
  },
  {
    id: 2,
    img: 'assets/foto1.png',
    marca: 'New Balance',
    modelo: 'NB 9060',
    precio: 80
  },
  {
    id: 3,
    img: 'assets/foto2.png',
    marca: 'Nike Original',
    modelo: 'Nike Revolution',
    precio: 90
  },
  {
    id: 4,
    img: 'assets/foto3.png',
    marca: 'Adidas Original',
    modelo: 'Forun Bucle',
    precio: 100
  },
  {
    id: 5,
    img: 'assets/foto4.png',
    marca: 'Adidas Original',
    modelo: 'Campus',
    precio: 120
  },
  {
    id: 6,
    img: 'assets/foto5.png',
    marca: 'New Balance',
    modelo: 'NB 327',
    precio: 120
  },
  {
    id: 7,
    img: 'assets/foto6.png',
    marca: 'Nike Original',
    modelo: 'Dunk Low',
    precio: 100
  },
  {
    id: 8,
    img: 'assets/foto7.png',
    marca: 'Adidas Original',
    modelo: 'Gacelle',
    precio: 90
  },
  {
    id: 9,
    img: 'assets/foto8.png',
    marca: 'Nike Original',
    modelo: 'Air Max SC',
    precio: 150
  },
  {
    id: 10,
    img: 'assets/foto9.png',
    marca: 'Adidas Original',
    modelo: 'Handball Spezial',
    precio: 120
  },
  {
    id: 11,
    img: 'assets/foto10.png',
    marca: 'Nike original',
    modelo: 'Air Force',
    precio: 130
  },
  {
    id: 12,
    img: 'assets/foto11.png',
    marca: 'New Balance',
    modelo: 'NB 9060',
    precio: 100
  },
  {
    id: 13,
    img: 'assets/foto12.png',
    marca: 'New Balance',
    modelo: 'NB 480',
    precio: 150
  },
  {
    id: 14,
    img: 'assets/foto13.png',
    marca: 'Nike Original',
    modelo: 'Full Force Low',
    precio: 70
  },
  {
    id: 15,
    img: 'assets/foto14.png',
    marca: 'Nike Original',
    modelo: 'Air Max SC',
    precio: 160
  },
  {
    id: 16,
    img: 'assets/foto15.png',
    marca: 'Adidas Original',
    modelo: 'Handball spzial',
    precio: 140
  }
]

const printZapas = (zapas, mensaje = '') => {
  const divZapas = document.querySelector('#plalleras')
  divZapas.innerHTML = ''

  if (mensaje) {
    const mensajeSugerencia = document.createElement('h2')
    mensajeSugerencia.textContent = mensaje
    mensajeSugerencia.style.color = 'blue'
    divZapas.appendChild(mensajeSugerencia)
  }

  for (const zapa of zapas) {
    const divZapa = document.createElement('div')
    const divImg = document.createElement('div')
    const img = document.createElement('img')
    const marca = document.createElement('h2')
    const modelo = document.createElement('h3')
    const precio = document.createElement('p')
    const button = document.createElement('button')

    divZapa.className = 'flex-container'
    divImg.classList = 'imgContainer'
    button.classList = 'boton'
    img.src = zapa.img
    marca.textContent = zapa.marca
    modelo.textContent = zapa.modelo
    precio.textContent = `${zapa.precio}€`
    button.textContent = 'Comprar'

    divZapa.appendChild(divImg)
    divImg.appendChild(img)
    divZapa.appendChild(marca)
    divZapa.appendChild(modelo)
    divZapa.appendChild(precio)
    divZapa.appendChild(button)
    divZapas.appendChild(divZapa)
  }
}

const obtenerSugerencias = (zapatillas, cantidad = 3) => {
  const sugerencias = []
  const indicesSeleccionados = new Set()

  while (sugerencias.length < cantidad) {
    const indiceAleatorio = Math.floor(Math.random() * zapatillas.length)
    if (!indicesSeleccionados.has(indiceAleatorio)) {
      sugerencias.push(zapatillas[indiceAleatorio])
      indicesSeleccionados.add(indiceAleatorio)
    }
  }

  return sugerencias
}

printZapas(zapatillas)

const crearFiltros = () => {
  const container = document.createElement('div')
  container.id = 'filtros'

  const selectMarca = document.createElement('select')
  selectMarca.id = 'filtroMarca'

  const marcasUnicas = [...new Set(zapatillas.map((zapa) => zapa.marca))]
  selectMarca.innerHTML = `<option value="">Todas las marcas</option>`
  marcasUnicas.forEach((marca) => {
    const marcaOption = document.createElement('option')
    marcaOption.value = marca
    marcaOption.textContent = marca
    selectMarca.appendChild(marcaOption)
  })

  const inputPrecio = document.createElement('input')
  inputPrecio.type = 'number'
  inputPrecio.id = 'filtroPrecio'
  inputPrecio.placeholder = 'Precio máximo (€)'
  inputPrecio.min = 0

  const btnFiltrar = document.createElement('button')
  btnFiltrar.id = 'aplicarFiltro'
  btnFiltrar.textContent = 'Filtrar'

  const btnLimpiar = document.createElement('button')
  btnLimpiar.id = 'limpiarFiltro'
  btnLimpiar.textContent = 'Limpiar'

  btnFiltrar.addEventListener('click', () => {
    const precioMaximo = parseFloat(inputPrecio.value)
    aplicarFiltros(selectMarca.value, isNaN(precioMaximo) ? null : precioMaximo)
  })

  btnLimpiar.addEventListener('click', () => {
    limpiarFiltros(selectMarca, inputPrecio)
  })

  container.appendChild(selectMarca)
  container.appendChild(inputPrecio)
  container.appendChild(btnFiltrar)
  container.appendChild(btnLimpiar)

  document.body.insertBefore(container, document.querySelector('#plalleras'))

  return container
}

const toggleFiltros = (container, arrowImg) => {
  if (container.style.display === 'none') {
    container.style.display = 'flex'
    arrowImg.style.transform = 'rotate(180deg)'
  } else {
    container.style.display = 'none'
    arrowImg.style.transform = 'rotate(0deg)'
  }
}

const aplicarFiltros = (marca, precioMaximo) => {
  const zapatillasFiltradas = zapatillas.filter((zapa) => {
    return (
      (!marca || zapa.marca.includes(marca)) &&
      (precioMaximo === null || zapa.precio <= precioMaximo)
    )
  })

  if (zapatillasFiltradas.length === 0) {
    const sugerencias = obtenerSugerencias(zapatillas)
    printZapas(
      sugerencias,
      'No se encontraron coincidencias. Aquí tienes algunas sugerencias:'
    )
  } else {
    printZapas(zapatillasFiltradas)
  }
}

const limpiarFiltros = (selectMarca, inputPrecio) => {
  selectMarca.value = ''
  inputPrecio.value = ''
  printZapas(zapatillas)
}

document.addEventListener('DOMContentLoaded', () => {
  const iconFilters = document.querySelector('.filters')
  const arrowImg = document.querySelector('.arrow')
  const filtrosContainer = crearFiltros()

  iconFilters.addEventListener('click', () => {
    toggleFiltros(filtrosContainer, arrowImg)
  })
})

/* terminado */
