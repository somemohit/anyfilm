export interface DisplayCardProps {
  categoryEndpoint: string;
  category: string;
}

export interface ModalComponentProps {
  closeModal: () => void; // Assuming closeModal is a function with no arguments and no return value
  children: React.ReactNode; // This allows any content (string, JSX elements, etc.)
  isModalOpen: boolean; // A boolean to check whether the modal is open or not
}

export interface MovieDetails {
  backdrop_path?: string;
  title?: string;
  name?: string;
  overview?: string;
  tagline?: string;
  release_date?: string;
  genres?: [];
  id: string;
  runtime: number;
  number_of_episodes: number;
  vote_average: number;
}

export interface MovieCreditDetails {
  cast: [];
}
export interface PopUpAllDetailsProps {
  contentDetailsEndpoint: string;
  contentCreditDetailsEndpoint: string;
}

export type MovieData = {
  backdropPath: string;
  title: string;
  overview: string;
  id: string;
};

export type CategoryStripBannerProps = {
  categoryName: string;
};
