// Seleção dos elementos
const nameInput = document.querySelector('.input-name');
const codeInput = document.querySelector('.input-code');
const descriptionInput = document.querySelector('.input-description');
const priceInput = document.querySelector('.input-price');
const productTableBody = document.querySelector('tbody');
const form = document.querySelector('#product-form');
const submitBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const feedbackMessage = document.querySelector('#feedback-message');
let isEditing = false;
let editingRow = null;

// Função para formatar valores em moeda brasileira
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Função para salvar os produtos no localStorage
const saveProductsToStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

// Função para carregar os produtos do localStorage
const loadProductsFromStorage = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        const newRow = createTableRow(product);
        productTableBody.appendChild(newRow);
        addRowEventListeners(newRow);
    });
};

// Função para obter todos os produtos da tabela
const getAllProductsFromTable = () => {
    const rows = document.querySelectorAll('tbody tr');
    const products = [];
    
    rows.forEach(row => {
        const product = {
            name: row.querySelector('.product-name').textContent,
            code: row.querySelector('.product-code').textContent,
            description: row.querySelector('.product-description').textContent,
            price: extractNumericValue(row.querySelector('.product-price').textContent)
        };
        products.push(product);
    });

    return products;
};

// Função para criar o objeto produto
const createProductObject = () => {
    return {
        name: nameInput.value.trim(),
        code: codeInput.value.trim(),
        description: descriptionInput.value.trim(),
        price: Number(priceInput.value)
    };
};

// Função para validar o produto
const validateProduct = (product) => {
    if (product.name === "" || product.code === "" || product.description === "" || isNaN(product.price) || product.price <= 0) {
        showFeedback("Preencha todos os campos corretamente.", "error");
        return false;
    }

    // Verificação de duplicidade do código do produto
    const existingProduct = getAllProductsFromTable().find(p => p.code === product.code);
    if (existingProduct && (!isEditing || existingProduct.code !== editingRow.querySelector('.product-code').textContent)) {
        showFeedback("Código do produto já existe. Use um código único.", "error");
        return false;
    }

    return true;
};

// Função para adicionar ou atualizar produto na tabela
const addOrUpdateProductInTable = (product, row = null) => {
    if (row) {
        // Atualiza as células existentes na linha
        updateTableRow(row, product);
    } else {
        // Cria uma nova linha e adiciona à tabela
        const newRow = createTableRow(product);
        productTableBody.appendChild(newRow);

        showFeedback("Produto adicionado com sucesso.", "success");

        // Adiciona eventos de editar e deletar
        addRowEventListeners(newRow);
    }
};

// Função para atualizar uma linha existente com os dados do produto
const updateTableRow = (row, product) => {
    row.querySelector('.product-name').textContent = product.name;
    row.querySelector('.product-code').textContent = product.code;
    row.querySelector('.product-description').textContent = product.description;
    row.querySelector('.product-price').textContent = formatCurrency(product.price);

    showFeedback("Produto atualizado com sucesso.", "success");
};

// Função para criar uma nova linha na tabela
const createTableRow = (product) => {
    const newRow = document.createElement('tr');

    newRow.appendChild(createTableCell('product-name', product.name));
    newRow.appendChild(createTableCell('product-code', product.code));
    newRow.appendChild(createTableCell('product-description', product.description));
    newRow.appendChild(createTableCell('product-price', formatCurrency(product.price)));

    // Cria a célula de ações com botões de editar e deletar
    const actionsCell = document.createElement('td');
    const editBtn = createActionButton('Editar', 'edit');
    const deleteBtn = createActionButton('Deletar', 'delete');
    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    newRow.appendChild(actionsCell);

    return newRow;
};

// Função para criar uma célula da tabela
const createTableCell = (className, textContent) => {
    const cell = document.createElement('td');
    cell.classList.add(className);
    cell.textContent = textContent;
    return cell;
};

// Função para criar um botão de ação (editar/deletar)
const createActionButton = (text, className) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
};

// Função para adicionar eventos de editar e deletar a uma linha da tabela
const addRowEventListeners = (row) => {
    row.querySelector('.edit').addEventListener('click', () => startEditingProduct(row));
    row.querySelector('.delete').addEventListener('click', () => {
        productTableBody.removeChild(row);
        showFeedback("Produto deletado com sucesso.", "success");
        saveProductsToStorage(getAllProductsFromTable());
    });
};

// Função para extrair o valor numérico de uma string formatada como moeda
const extractNumericValue = (formattedValue) => {
    return Number(formattedValue.replace(/[^\d,-]/g, '').replace(',', '.'));
};

// Função para iniciar a edição de um produto
const startEditingProduct = (row) => {
    isEditing = true;
    editingRow = row;

    // Preencher o formulário com os dados do produto
    nameInput.value = row.querySelector('.product-name').textContent;
    codeInput.value = row.querySelector('.product-code').textContent;
    descriptionInput.value = row.querySelector('.product-description').textContent;
    priceInput.value = extractNumericValue(row.querySelector('.product-price').textContent);

    // Ajustar o texto do botão para indicar edição e mostrar o botão de cancelar
    submitBtn.textContent = 'Atualizar Produto';
    cancelBtn.classList.remove('hide');
};

// Função para cancelar a edição
const cancelEditing = () => {
    isEditing = false;
    editingRow = null;
    
    // Limpar o formulário
    form.reset();
    
    // Voltar o texto do botão para "Adicionar Produto" e esconder o botão de cancelar
    submitBtn.textContent = 'Adicionar Produto';
    cancelBtn.classList.add('hide');
};

// Evento de cancelamento da edição 
cancelBtn.addEventListener('click', cancelEditing);

// Função para exibir mensagem de feedback 
const showFeedback = (message, type) => {
    feedbackMessage.textContent = message;
    feedbackMessage.className = '';
    feedbackMessage.classList.add(type);
    feedbackMessage.classList.remove('hide');

    setTimeout(() => {
        feedbackMessage.classList.add('hide');
    }, 3000);
};

// Evento de submissão do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const product = createProductObject();

    if (validateProduct(product)) {
        if (isEditing) {
            addOrUpdateProductInTable(product, editingRow);
            cancelEditing();
        } else {
            addOrUpdateProductInTable(product);
        }

        // Atualiza o localStorage após adicionar/atualizar o produto
        saveProductsToStorage(getAllProductsFromTable());
        form.reset();
    }
});

// Carregar produtos do localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', loadProductsFromStorage);
