import { Rating } from "@mui/material";

function StarRatingComponent({ rating, handleRatingChange, readOnly = false }) {
  return (
    <Rating
      name="user-rating"
      value={rating}
      onChange={(event, newValue) => {
        if (handleRatingChange && !readOnly) {
          handleRatingChange(newValue);
        }
      }}
      precision={0.5}
      size="large"
      readOnly={readOnly}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "#ba9659",
        },
        "& .MuiRating-iconEmpty": {
          color: "#ba9659",
        },
        "& .MuiRating-icon:hover": {
          color: readOnly ? "#ba9659" : "#838a60",
        },
      }}
    />
  );
}

export default StarRatingComponent;
