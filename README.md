Objetivo: Definir una API paraa gestionar nuestro equipo Pokémon

#Acciones:
    - Identificarnos
    - Añadir Pokémon a nuestro equipo
    - Eliminar Pokémon de nuestro equipo
    - Consultar información de nuestro equipo
    - Intercambiar el orden de nuestros Pokémon

#REST Design:
    - Añadir Pokémon: POST /team/pokemons
    - Consultar equipo: GET /team
    - Eliminar pokémon: DELETE /team/pokemons/:id
    - Intercambiar el orden de nuestros pokémon: PUT /team
    - Sistema de credenciales