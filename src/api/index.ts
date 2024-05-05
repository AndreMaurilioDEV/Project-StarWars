type ApiToRemove = {
  residents: []
};

export const apiPlanets = async () => {
  try {
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const data = await response.json();
    const infoPlanets = data.results;
    const planetsRemoveResidents = infoPlanets.map((planet: ApiToRemove) => {
      const { residents, ...planetsWithoutResidents } = planet;
      return planetsWithoutResidents;
    });
    return planetsRemoveResidents;
  } catch (error) {
    console.log(error);
  }
};


export const apiUniquePlanet = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPlanetFilms = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const apiPlanetsResidents = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    
  }
}
