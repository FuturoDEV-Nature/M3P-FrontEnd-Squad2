import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'

export function Marcadores({ destino = [] }) {
    const map = useMap();

    // Função para garantir que 'destino' seja sempre um array
    const destinosArray = Array.isArray(destino) ? destino : destino ? [destino] : [];

    useEffect(() => {
        if (destinosArray.length > 0) {
            const primeiroLocaldaLista = destinosArray[0];
            if (primeiroLocaldaLista.latitude && primeiroLocaldaLista.longitude)
            map.flyTo(
                {
                    lat: primeiroLocaldaLista.latitude,
                    lng: primeiroLocaldaLista.longitude,
                },
                13,
                { animate: true }
            );
        }
    }, [destinosArray, map]);

    return (
        <>
            {destinosArray.map((local) => (
                local.latitude != null && local.longitude != null ? (
                <Marker key={local.destino_id} position={[local.latitude, local.longitude]}>
                    <Popup>
                        <strong>{local.nomelocal}</strong>
                        <p>{local.descricao}</p>
                    </Popup>
                </Marker>
                ) : null
            ))}
        </>
    );
}

// export function Marcadores ({ destino = []} ) {

//     const map = useMap()
    
//     useEffect(() => {
//         if(Array.isArray(destino) && destino.length > 0 ){
//             const primeiroLocaldaLista = destino[0]
//             map.flyTo({
//                 lat: primeiroLocaldaLista.latitude,
//                 lng: primeiroLocaldaLista.longitude,
//             },
//             13,
//             {animate: true},
//         )
//         }
//     }, [destino, map])

//     return (
//         <>
//         {Array.isArray(destino) && destino.map((local) => (
//             <Marker
//                 key={local.id}
//                 position={[local.latitude, local.longitude]}
//             >
//                 <Popup key={local.popup}> 
//                     <strong>{local.nomelocal}</strong>
//                     <p>{local.descricao}</p>
//                 </Popup>    
//             </Marker>
//         ))}
//     </>
//     )
// }

// Marcadores.propTypes = {
//     destino: propTypes.array.isRequired,
// }

// Definição dos PropTypes
Marcadores.propTypes = {
    destino: propTypes.oneOfType([
        propTypes.array, // Aceita um array
        propTypes.object, // Aceita um objeto
    ]).isRequired, // Torna a prop obrigatória
};