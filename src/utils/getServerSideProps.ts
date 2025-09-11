import { GetServerSideProps } from "next";
import { Vagon } from "../types/vagon";

type Props = {
  vagons: Vagon[];
};

export const getVagonsServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(
    "https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo",
    { method: "GET", cache: "no-store" }
  );
  const data = await res.json();
  const vagons: Vagon[] = data.Vagons.map((vagon: any) => ({
    VagonNumber: vagon.VagonNumber,
    VagonType: vagon.VagonType,
    CargoName: vagon.CargoName,
    OwnerName: vagon.OwnerName,
    DepartureStationName: vagon.DepartureStationName,
  }));

  return {
    props: {
      vagons,
    },
  };
};

export async function getVagonByIdServerSideProps(
  id: string
): Promise<{ props: { formattedVagon: Vagon | null } }> {
  const res = await fetch(
    "https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo",
    { method: "GET", cache: "no-store" }
  );
  if (!res.ok) {
    return {
      props: {
        formattedVagon: null,
      },
    };
  }
  const data = await res.json();
  const vagon = data.Vagons.find((v: any) => v.VagonNumber === id);
  if (!vagon) {
    return {
      props: {
        formattedVagon: null,
      },
    };
  }
  const formattedVagon: Vagon = {
    VagonNumber: vagon.VagonNumber,
    VagonType: vagon.VagonType,
    VagonIsCovered: vagon.VagonIsCovered,
    WeightBrutto: vagon.WeightBrutto,
    WeightNet: vagon.WeightNet,
    WeghtTare: vagon.WeghtTare,
    ProcessingKind: vagon.ProcessingKind,
    OperationKind: vagon.OperationKind,
    CargoName: vagon.CargoName,
    OwnerName: vagon.OwnerName,
    IsPrivate: vagon.IsPrivate,
    ShipperName: vagon.ShipperName,
    ReceiverName: vagon.ReceiverName,
    RailwayOwn: vagon.RailwayOwn,
    RailbillNumber: vagon.RailbillNumber,
    Capacity: vagon.Capacity,
    DepartureStationName: vagon.DepartureStationName,
    DestinationCountryName: vagon.DestinationCountryName,
    CargoStamps: vagon.CargoStamps,
  };
  return {
    props: {
      formattedVagon,
    },
  };
}
