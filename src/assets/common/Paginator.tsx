import React from "react";
import Pagination from "rc-pagination";
import localeInfo from '../../locale/en_US';

type PropsType = {
    currentPage: number
    totalUsersCount: number
    onPageHandler:(pageNumber: number) => void
    pageSize: number

}
export const Paginator: React.FC <PropsType> = props=> {
    const {currentPage,totalUsersCount,onPageHandler, pageSize }=props
        return(
    <div className={"pagination"}>
        <Pagination className="ant-pagination"
                    showTitle={true}
                    defaultCurrent={currentPage}
                    total={totalUsersCount}
                    onChange={(e) => onPageHandler(e)}
                    defaultPageSize={pageSize}
                    pageSize={pageSize}
                    locale={localeInfo}/>
    </div>)
}