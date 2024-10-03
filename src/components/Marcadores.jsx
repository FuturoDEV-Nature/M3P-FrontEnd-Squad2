import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'

export function Marcadores ({ destino} ) {

    const map = useMap()
    
    useEffect(() => {
        if(destino.length > 0 ){
            const primeiroLocaldaLista = destino[0]
            map.flyTo({
                lat: primeiroLocaldaLista.latitude,
                lng: primeiroLocaldaLista.longitude,
            },
            13,
            {animate: true},
        )
        }
    }, [destino, map])

    return (
        <>
        {Array.isArray(destino) && destino.map((local) => (
            <Marker
                key={local.nome}
                position={[local.latitude, local.longitude]}
            >
                <Popup key={local.popup}> 
                    <strong>{local.nomelocal}</strong>
                    <p>{local.descricao}</p>
                </Popup>    
            </Marker>
        ))}
    </>
    )
}

Marcadores.propTypes = {
    destino: propTypes.array.isRequired,
}