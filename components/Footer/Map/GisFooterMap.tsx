import React, { FC, useEffect } from 'react'
// import {load} from "@2gis/mapgl";
import { number } from 'prop-types'

// interface IGisMap{
//     location: string;
//     zoom: number;
// }
//
// const GisFooterMap:FC<IGisMap> = ({
//     location,
//     zoom
//                          }) => {
//     useEffect(()=>{
//         let map;
//         load().then((mapglAPI)=>{
//             map = new mapglAPI.Map("map-container", {
//                 center: getCenterLocation(),
//                 zoom: zoom,
//                 key: null,
//             });
//         });
//
//         return () => map && map.destroy();
//     },[])
//
//     return(
//         <>
//             <div style={{
//                 width: "100%",
//                 height: "100%",
//             }}>
//                 <GisMapWrapper/>
//             </div>
//         </>
//     )
// }
//
// // eslint-disable-next-line react/display-name
// const GisMapWrapper:FC = React.memo(()=>{
//     return(
//         <div
//             id={"map-container"}
//             style={{
//                 width: "100%",
//                 height: "100%",
//             }}>
//
//         </div>
//     )
// },() => true);
//
// export default GisFooterMap;
