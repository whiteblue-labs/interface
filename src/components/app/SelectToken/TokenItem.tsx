export interface ITokenItemProps {
  name: string;
  symbol: string;
  uriImg: any;
  network: string | undefined;
  balance: string;
  onClickItem ?: () => void;
}

export const TokenItem = (props: ITokenItemProps) => {
  return (
    <div
      style={{}}
      className="token-item-container"
      onClick={props.onClickItem}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flex: 0.8,
        }}
      >
        <img
          src={props.uriImg}
          style={{ height: 50, marginRight: 10 }}
          alt="Token"
        />
        <div>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "black",
            }}
          >
            {props.name}
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "rgba(0,0,0,0.4)",
            }}
          >
            {props.network}
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#169ccc",
        }}
      >
        { String(props.balance).length > 5 ? Number(props.balance).toFixed(5) : props.balance } {props.symbol}{" "}
      </p>
    </div>
  );
};
