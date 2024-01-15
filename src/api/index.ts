import { object } from "prop-types";

type apiToRemove = {
    residents: []
}

const api_Planets = async () => {
    try {
        const url = 'https://swapi.dev/api/planets';
        const response = await fetch(url);
        const data = await response.json();
        const info_Planets = data.results;
        const planetsRemoveResidents = info_Planets.map((planet: apiToRemove) => {
            const {residents,  ...planetsRemoveResidents} = planet; 
            return planetsRemoveResidents
        });
        return planetsRemoveResidents;
    } catch (error) {
        console.log(error);
    }
};

export default api_Planets;