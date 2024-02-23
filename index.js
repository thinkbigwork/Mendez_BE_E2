//Creacion de la clase de productos
    class ProductManager{
        constructor (){
            this.products = []
            this.id = 1
        }
        
        // Creacion de array de productos vacio
        products = []

        //Metodo para agregar productos
        addProduct(product) {

            // Validar campos vacios
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                console.error('Faltan datos, los campos deben estar completos')
                return 
            }

            //Validar datos unicos en code
            if(this.products.some(p => p.code === product.code)){
                console.error('El ID del producto ya existe')
                return
            }

            //Agregar producto con ID autoincrementable
            product.id = this.id++
            this.products.push(product)
            console.log(`Producto *${product.title}* agregado correctamente`)
        }

        // Metodo para obtener productos
        getProducts() {
            return this.products
        }

        // Metodo para obtener productos por ID
        getProductsId(id) {
                const product = this.products.find(p => p.id === id)

                //Validacion ID inexistente
                if(!product){
                    console.error('No se encontró el producto que buscabas')
                }
            return product
        }
    }


const bd = new ProductManager()

// FUncion para simular carga de productos
loadProducts()

// Mostrar todos array completo
const listProducts = bd.getProducts();
console.log('-----Listado completo de productos-----', listProducts);

// Mostrar un producto buscado por id
const productId = bd.getProductsId(3);
console.log('-----Producto buscado por ID-----', productId);


function loadProducts() {
    bd.addProduct({
        title: 'Manzana',
        description: 'Manzana roja grande',
        price: 1500,
        thumbnail: '../archivo1.jpg',
        code: codeGenerator(),
        stock: 50
    })
    bd.addProduct({
        title: 'Pera',
        description: 'Pera de Israel',
        price: 1200,
        thumbnail: '../archivo2.jpg',
        code: codeGenerator(),
        stock: 38
    })
    bd.addProduct({
        title: 'Uva',
        description: 'Uva blanca',
        price: 1800,
        thumbnail: '../archivo3.jpg',
        code: codeGenerator(),
        stock: 78
    })
    bd.addProduct({
        title: 'Melon',
        description: 'Melon amarillo',
        price: 1530,
        thumbnail: '../archivo4.jpg',
        code: codeGenerator(),
        stock: 11
    })
}


function codeGenerator (){
    let code = Math.random().toString(36).substring(3, 9)
    return code
}
