import React, {ComponentType} from 'react';
import Preloader from "../components/preloader/preloader";

export function WithSuspense<T>(Component: ComponentType<T>) {
    return (props: any) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props as T}/>
        </React.Suspense>
    }
}

