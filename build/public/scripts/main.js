//Init HTML elements
let buttons = document.querySelectorAll('.equipment_item')
let items_list = document.querySelectorAll('.equipment_list_items')
let Character1 = items_list[0]
let Character2 = items_list[1]
let Character3 = items_list[2]


//Add listner to each character makeing appear and disappear on click.
buttons[0].addEventListener('click', function(e){
    if(items_list[0].style.display != 'none'){
        items_list[0].style.display = 'none'
    }else{
        items_list[0].style.display = 'flex'
    }

})
buttons[1].addEventListener('click', function(e){
    if(items_list[1].style.display != 'none'){
        items_list[1].style.display = 'none'
    }else{
        items_list[1].style.display = 'flex'
    }

})
buttons[2].addEventListener('click', function(e){
    if(items_list[2].style.display != 'none'){
        items_list[2].style.display = 'none'
    }else{
        items_list[2].style.display = 'flex'
    }

})