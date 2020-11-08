let updateKey;

const ContactTable = localforage.createInstance({
    name: "CRMApp",
    storeName: "ContactTable"
});

const getClientDetails = () => {
    const clientName = document.getElementById("clientName").value;
    const clientPhone = document.getElementById("clientPhone").value;
    const clientNeed = document.getElementById("clientNeed").value;

    return {
        clientName: clientName,
        clientPhone: clientPhone,
        clientNeed: clientNeed,
    }
}

const addInput = async () => {
    const clientDetails = getClientDetails();
    const dbLength = await ContactTable.length()
    let id = dbLength === 0 ? 1 : dbLength + 1;
    try{
        let row = `<tr id="${id}">
                        <td>${clientDetails.clientName}</td>
                        <td>${clientDetails.clientPhone}</td>
                        <td>${clientDetails.clientNeed}</td>
                        <td><button class="edit">Edit</button></td>
                        <td><button class="delete"> Delete</button></td>
                    </tr>`
        document.querySelector('tbody').insertAdjacentHTML('afterbegin', row);
        await ContactTable.setItem(id, clientDetails);
        alert('contact added sucessfully');
    }catch(e){
        console.log(err.message);
    }


}

const loadContactsFromStorage = async () => {
    try {
        await ContactTable.iterate((value, key, iterationNumber) => {
            let newContact = `<tr id="${key}">
                                <td>${value.clientName}</td>
                                <td>${value.clientPhone}</td>
                                <td>${value.clientNeed}</td>
                                <td><button class="edit">Edit</button></td>
                                <td><button class="delete"> Delete</button></td>
                           </tr>`
            document.querySelector('tbody').insertAdjacentHTML('afterbegin', newContact);
        })
    } catch (err) {
        console.log(err)
    }

}

const deleteContact = async(e) => {
    const row = e.target.parentElement.parentElement;
    const key = row.id;
    row.remove();
    try{
        await ContactTable.removeItem(key);
        alert('Contact deleted succesfully');
    }catch(err){
        console.log(err.message);
    }


}

const viewContact = async(e) => {
    updateKey =  e.target.parentElement.parentElement.id;

    const editName = document.getElementById("editName");
    const editPhone = document.getElementById("editPhone");
    const editNeed = document.getElementById("editNeed");

    try{
        const contact = await ContactTable.getItem(updateKey);

        editName.value = contact.clientName;
        editPhone.value = contact.clientPhone;
        editNeed.value = contact.clientNeed;

        document.getElementById("modal").style.display= "block";

    }catch(err){
        console.log(err.message);
    }

}

const updateContact = async() => {

    try{
        const updatedClient ={
            clientName: document.getElementById("editName").value,
            clientPhone: document.getElementById("editPhone").value,
            clientNeed: document.getElementById("editNeed").value,
        }

        let updatedRow = `<tr id="${updateKey}">
                        <td>${updatedClient.clientName}</td>
                        <td>${updatedClient.clientPhone}</td>
                        <td>${updatedClient.clientNeed}</td>
                        <td><button class="edit">Edit</button></td>
                        <td><button class="delete"> Delete</button></td>
                    </tr>`

        document.getElementById(`${updateKey}`).remove();
        document.querySelector('tbody').insertAdjacentHTML('afterbegin', updatedRow);

        await ContactTable.setItem(updateKey, updatedClient);

        document.getElementById("modal").style.display= "none";

        alert('Contact updated succesfully');
    }catch(err){
        console.log(err.message);
    }
}


document.getElementById('submit').addEventListener('click', async(e) => {
    e.preventDefault();
    await addInput();
})

document.getElementById('update').addEventListener('click', async(e) => {
    e.preventDefault();
    await updateContact();
})

window.addEventListener('load', async() => {
    await loadContactsFromStorage();
    document.querySelectorAll('.delete').forEach(button =>{
        button.addEventListener('click', async(e) => {
          await deleteContact(e);
        })
    });
    document.querySelectorAll('.edit').forEach(button =>{
        button.addEventListener('click', async(e) => {
          await viewContact(e);
        })
    })
})

