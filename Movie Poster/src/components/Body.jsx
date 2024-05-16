import PropType from 'prop-types';
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const Section = styled.section`
    width: 100%;
    height: calc(100vh - 5rem);
    position: relative;
    &:after {
        content: '';
        display: block;
        clear: both;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        ${props => props.bg ? `
            background: url(${props.bg}) no-repeat center center/cover;
            animation: fadeIn 1s forwards;
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: .2; }
            }
    ` : ''}
    }
    & > * {
        position: relative;
        z-index: 2;
    }
`

function Body ({ bgImage, children }) {
    return (
        <>
            <NavigationBar />
            <Section bg={bgImage}>
                {children}
            </Section>
        </>
    )
}

Body.propsType = {
    bgImage: PropType.string,
    children: PropType.node.isRequired
}

export default Body;