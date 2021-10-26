import React from "react";
import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";
import {updateStatus} from "../../../redux/profile-reducer";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={updateStatus}/>);
        const instance: any = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    })

    test("after creation span should be contains correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={updateStatus}/>);
        const root = component.root;
        const span: any = root.findByType("span")
        debugger
        expect(span.children[0]).toBe("it-kamasutra.com");
    });

    test("span length should not to be null", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={updateStatus}/>);
        const root = component.root;
        const span: any = root.findByType("span")
        debugger
        expect(span.length).not.toBeNull()
    });

    test("input should not to be", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={updateStatus}/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input")
        }).toThrow()
    });

    test("input should be instead of span", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={updateStatus}/>);
        const root = component.root;
        const span: any = root.findByType("span")
        span.props.onDoubleClick()
        const input = root.findByType("input")
        expect(input.props.value).toBe("it-kamasutra.com")
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn((status: string) => "aaaa")
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback}/>);
        const instance: any = component.getInstance()
        instance.deActivateMode()
        expect(mockCallback.mock.calls.length).toBe(1)

    })
})
