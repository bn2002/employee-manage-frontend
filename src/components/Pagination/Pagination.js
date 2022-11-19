import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import firstPageSvg from "~/assets/icon/btn-firstpage.svg";
import prevPageSvg from "~/assets/icon/btn-prev-page.svg";
import nextPageSvg from "~/assets/icon/btn-next-page.svg";
import lastPageSvg from "~/assets/icon/btn-lastpage.svg";
const cx = classNames.bind(styles);

function Pagination({ tables }) {
    const {
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tables;

    return (
        <div className={cx("pagination")}>
            <div className={cx("pagination__status")}>
                <span>Trang </span>
                <strong>
                    {pageIndex + 1} / {pageOptions.length}
                </strong>
            </div>
            <div>
                <ul className={cx("pagination__list")}>
                    <li
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className={cx(
                            "pagination__item",
                            "pagination__item--none-border",
                            { disable: !canPreviousPage }
                        )}>
                        <img
                            src={firstPageSvg}
                            alt="first page"
                            className={cx("pagination__icon")}
                        />
                    </li>
                    <li
                        onClick={() => gotoPage(pageIndex - 1)}
                        className={cx(
                            "pagination__item",
                            "pagination__item--none-border",
                            { disable: !canPreviousPage }
                        )}
                        disabled={!canPreviousPage}>
                        <img
                            src={prevPageSvg}
                            alt="prev page"
                            className={cx("pagination__icon")}
                        />
                    </li>
                    <li
                        onClick={() => {
                            console.log("next-page", pageIndex);
                            gotoPage(pageIndex + 1);
                        }}
                        className={cx(
                            "pagination__item",
                            "pagination__item--none-border",
                            { disable: !canNextPage }
                        )}
                        disabled={!canNextPage}>
                        <img
                            src={nextPageSvg}
                            alt="next page"
                            className={cx("pagination__icon")}
                        />
                    </li>
                    <li
                        className={cx(
                            "pagination__item",
                            "pagination__item--none-border",
                            { disable: !canNextPage }
                        )}
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}>
                        <img
                            src={lastPageSvg}
                            alt="last page"
                            className={cx("pagination__icon")}
                        />
                    </li>
                </ul>
            </div>

            <div className={cx("pagination__perpage")}>
                <select
                    value={pageSize}
                    className={cx("pagination__select")}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}>
                    {[2, 10, 25, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <span>Nhân viên/trang</span>
            </div>
        </div>
    );
}

export default Pagination;
