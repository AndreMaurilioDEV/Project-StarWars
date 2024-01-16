type ApiToRemove = {
  residents: []
};

const apiPlanets = async () => {
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

export default apiPlanets;
