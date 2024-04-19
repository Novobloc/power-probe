import Card from "components/card";
import classnames from "classnames";

const NftCard = (props: {
  image: string;
  title: string;
  author: string;
  sub: number;
  color: string;

  download?: string;
}) => {
  const { title, sub, color } = props;

  return (
    <Card extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white `}>
      <div className="h-full w-full">
        <div className="flex w-full items-center justify-between">
          <p className="text-9xl font-bold text-navy-700 dark:text-white">
            {sub}
          </p>
        </div>

       
          <div className="flex items-center justify-center gap-2">
            <div className={classnames("h-8 w-8 rounded-full", color)} />
            <p className="text-sm font-bold text-brand-500 dark:text-white">
              {title}
            </p>
         
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
