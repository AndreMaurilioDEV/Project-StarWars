import { useEffect, useState } from "react";
import { imgPlanets, ImgType } from "../imgPlanets";

function useImgPlanet (initialValue: string) {
    const [image, setImage] = useState<ImgType[]>([]);

    useEffect(() => {
            if (initialValue) {
              const planet = imgPlanets.find((item) => item.name.includes(initialValue));
          
              if (planet) {
                setImage(() => [
                  { name: planet.name, imgSrc: planet.imgSrc.toString() },
                ]);
              }
            }
    }, [initialValue])
    return {
        image
    }
};

export default useImgPlanet;