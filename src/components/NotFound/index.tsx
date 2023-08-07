import cls from "./NotFound.module.scss";

type NotFoundProps = {
  id: string | undefined;
};

export default function NotFound({ id }: NotFoundProps) {
  return <div className={cls.text}>Cryptocurrency with name "{id}" was not found</div>;
}
