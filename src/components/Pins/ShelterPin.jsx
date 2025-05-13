import { Pin } from "@vis.gl/react-google-maps";

export default function ShelterPin({ is_accepting = true, scale = 1.2 }) {
    return (
        <Pin
            background={is_accepting ? "#80E0A7" : "#F76C6C"}
            borderColor={"#275C6A"}
            scale={scale}
        >
            <img
                src="/shelter-icon.png"
                alt="Shelter Marker"
                style={{
                    width: '32px',
                    height: '32px',
                    padding: '4px',
                    objectFit: 'contain',
                    filter: 'brightness(0) saturate(100%) invert(20%) sepia(90%) saturate(500%) hue-rotate(190deg) brightness(95%) contrast(90%)'
                }}
            />
        </Pin>
    );
}