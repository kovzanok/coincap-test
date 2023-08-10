import Button from "../../UI/Button";
import cls from "./Pagination.module.scss";

type PaginataionProps = {
  page: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

export default function Paginataion({
  page,
  handleNextPage,
  handlePrevPage,
}: PaginataionProps) {
  return (
    <div className={cls.pagination}>
      <Button onClick={handlePrevPage} disabled={page === 0}>
        {"<"}
      </Button>
      Page#{page + 1}
      <Button onClick={handleNextPage}>{">"}</Button>
    </div>
  );
}
