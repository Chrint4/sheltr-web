import { Pin } from "@vis.gl/react-google-maps";

export default function FoodbankPin() {
    return (
        <Pin
            background={"white"}
            scale={1.5}
        >
            <img
                src="/food-bank-icon.png"
                alt="Food Bank Marker"
                style={{
                    width: '33px',
                    height: '40px',
                    padding: '4px',
                    objectFit: 'contain',
                    filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(2500%) hue-rotate(0deg) brightness(101%) contrast(119%)'
                }}
            />
        </Pin>
    );
}