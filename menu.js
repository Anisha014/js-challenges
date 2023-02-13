var menus = [
    {
        name: "Main Menu 1",
        menus: [
            {
                name: "Sub Menu 1"
            },
            {
                name: "Sub Menu 2",
                menus: [
                    {
                        name: "Super Sub Menu"
                    }
                ]
            }
        ]
    }
]
let i = 0;
function print(menus){
    menus.forEach((menu) =>{
        if (i == 0){
            console.log(menu.name);
        }
        if (i == 1){
            console.log(` ${menu.name}`);
        }
        if (i == 2){
            console.log(`  ${menu.name}`);
        }
        if (typeof menu.menus === "object"){
            i += 1;
            return print(menu.menus);
        }
    });
}
print(menus);