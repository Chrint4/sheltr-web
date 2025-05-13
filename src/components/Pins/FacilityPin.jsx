import { Pin } from "@vis.gl/react-google-maps";

export default function FacilityPin({ type, scale = 1.2 }) {
    return (
        <Pin
            background={"white"}
            scale={scale}
            borderColor={"#20C997"}
        >
            {(() => {
                switch (type) {
                    case "wifi":
                        return <img
                            src={`/${type}.png`}
                            alt="Wifi Marker"
                            style={{
                                width: '28px',
                                height: '25px',
                                padding: '4px',
                                paddingTop: '6px',
                                filter: 'brightness(0) saturate(100%) invert(71%) sepia(55%) saturate(3666%) hue-rotate(164deg) brightness(102%) contrast(97%)'
                            }}
                        />
                    case "toilet":
                        return <img
                            src={`/${type}.png`}
                            alt="Toilet Marker"
                            style={{
                                width: '24px',
                                height: '24px',
                                padding: '5px',
                                objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(55%) sepia(7%) saturate(263%) hue-rotate(169deg) brightness(89%) contrast(85%)'
                            }}
                        />
                    case "shower":
                        return <img
                            src={`/${type}.png`}
                            alt="Shower Marker"
                            style={{
                                width: '24px',
                                height: '24px',
                                padding: '4px',
                                objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(62%) sepia(11%) saturate(2127%) hue-rotate(122deg) brightness(92%) contrast(91%)'
                            }}
                        />
                    case "laundry":
                        return <img
                            src={`/${type}.png`}
                            alt="Laundry Marker"
                            style={{
                                width: '24px',
                                height: '24px',
                                padding: '4px',
                                objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(21%) sepia(84%) saturate(2368%) hue-rotate(274deg) brightness(90%) contrast(94%)'
                            }}
                        />
                    case "fresh_water":
                        return <img
                            src={`/${type}.png`}
                            alt="Fresh Water Marker"
                            style={{
                                width: '30px',
                                height: '26px',
                                padding: '4px',
                                objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(62%) sepia(91%) saturate(1298%) hue-rotate(165deg) brightness(103%) contrast(104%)'
                            }}
                        />
                    default:
                        return null;
                }
            })()}
        </Pin>
    )
}