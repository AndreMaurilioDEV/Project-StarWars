import TatooineSrc from '../../assets/Tatoooinefull.webp';
import AlderaanSrc from '../../assets/Alderaan_2.webp';
import YavinSrc from '../../assets/Yavin-4-SWCT.webp';
import HothSrc from '../../assets/Hoth_AoRCR.webp';
import DagobahSrc from '../../assets/Dagobah_2.webp';
import BespinSrc from '../../assets/Bespin_EotECR.webp';
import EndorSrc from '../../assets/Endor_FFGRebellion.webp';
import NabooSrc from '../../assets/NabooFull-SW.webp';
import CoruscantSrc from '../../assets/Coruscant-AoTCW.webp';
import KaminoSrc from '../../assets/Kamino-DB.webp';

export const imgPlanets = [
  {
    name: 'Tatooine',
    imgSrc: TatooineSrc
  },
  {
    name: 'Alderaan',
    imgSrc: AlderaanSrc
  },
  {
    name: 'Yavin IV',
    imgSrc: YavinSrc
  },
  {
    name: 'Hoth',
    imgSrc: HothSrc
  },
  {
    name: 'Dagobah',
    imgSrc: DagobahSrc
  },
  {
    name: 'Bespin',
    imgSrc: BespinSrc
  }, 
  {
    name: 'Endor',
    imgSrc: EndorSrc
  },
  {
    name: 'Naboo',
    imgSrc: NabooSrc
  },
  {
    name: 'Coruscant',
    imgSrc: CoruscantSrc
  },
  {
    name: 'Kamino',
    imgSrc: KaminoSrc
  },
];

export type ImgType = {
    name: string,
    imgSrc: string
 };