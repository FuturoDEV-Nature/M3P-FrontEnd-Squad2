import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet'

export function Marcadores ({ locais }) {

    const map = useMap()
    

    useEffect(() => {
        if(locais.length > 0 ){
            const primeiroLocaldaLista = locais[0]
            map.flyTo({
                lat: primeiroLocaldaLista.latitude,
                lng: primeiroLocaldaLista.longitude,
            },
            13,
            {animate: true},
        )
        }
    }, [locais, map])

    return (
        <>
        {locais.map((local) => (
            <Marker
            key={local.nome}
            position={[local.latitude, local.longitude]}
            >
            <Popup key={local.popup}> 
                <strong> {local.nomelocal} </strong>
                <p> {local.descricao} </p>
            </Popup>    
            </Marker>
        ))}
        </>
    )
}

Marcadores.propTypes = {
    locais: propTypes.array,
}