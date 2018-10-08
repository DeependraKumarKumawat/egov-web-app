import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { handleFileUpload } from "ui-utils/commons";
import { connect } from "react-redux";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { uploadFile } from "ui-utils/api";
import { UploadSingleFile } from "ui-molecules-local";

const styles = theme => ({
  documentContainer: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginBottom: "16px"
  },
  documentIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px"
  },
  documentSuccess: {
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39CB74",
    color: "white"
  },
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  }
});
const S3_BUCKET = {
  endPoint: "filestore/v1/files"
};

class DocumentList extends Component {
  state = {
    uploadedDocIndex: 0,
    uploadedIndex: [],
    uploadedDocuments: []
  };

  onUploadClick = uploadedDocIndex => {
    this.setState({ uploadedDocIndex });
  };

  handleDocument = (file, fileStoreId) => {
    let { uploadedDocIndex, uploadedDocuments } = this.state;
    const { prepareFinalObject, documents } = this.props;
    const jsonPath = documents[uploadedDocIndex].jsonPath;
    uploadedDocuments = {
      ...uploadedDocuments,
      [uploadedDocIndex]: [{ fileName: file.name, fileStoreId }]
    };

    prepareFinalObject(jsonPath, [{ fileName: file.name, fileStoreId }]);
    this.setState({ uploadedDocuments });
    this.getFileUploadStatus(true, uploadedDocIndex);
  };

  removeDocument = remDocIndex => {
    let { uploadedDocuments } = this.state;
    const { prepareFinalObject, documents } = this.props;
    const jsonPath = documents[remDocIndex].jsonPath;
    uploadedDocuments[remDocIndex] = [];
    prepareFinalObject(jsonPath, uploadedDocuments[remDocIndex]);
    this.setState({ uploadedDocuments });
    this.getFileUploadStatus(false, remDocIndex);
  };

  getFileUploadStatus = (status, index) => {
    const { uploadedIndex } = this.state;
    if (status) {
      uploadedIndex.push(index);
      this.setState({ uploadedIndex });
    } else {
      const deletedIndex = uploadedIndex.findIndex(item => item === index);
      uploadedIndex.splice(deletedIndex, 1);
      this.setState({ uploadedIndex });
    }
  };
  render() {
    const { classes, documents, description } = this.props;
    const { uploadedIndex } = this.state;
    return (
      <div>
        {documents.map((document, key) => {
          return (
            <div key={key} className={classes.documentContainer}>
              <Grid container={true}>
                <Grid item={true} xs={2} sm={1} align="center">
                  {uploadedIndex.indexOf(key) > -1 ? (
                    <div className={classes.documentSuccess}>
                      <Icon>done</Icon>
                    </div>
                  ) : (
                    <div className={classes.documentIcon}>
                      <span>{key + 1}</span>
                    </div>
                  )}
                </Grid>
                <Grid item={true} xs={6} sm={6} align="left">
                  <Typography variant="body2">
                    {document.name}
                    {document.required && (
                      <sup style={{ color: "#E54D42" }}>*</sup>
                    )}
                  </Typography>
                  <Typography variant="caption">{description}</Typography>
                </Grid>
                <Grid item={true} xs={12} sm={5} align="right">
                  <UploadSingleFile
                    classes={this.props.classes}
                    handleFileUpload={e =>
                      handleFileUpload(e, this.handleDocument, this.props)
                    }
                    uploaded={uploadedIndex.indexOf(key) > -1}
                    removeDocument={() => this.removeDocument(key)}
                    documents={this.state.uploadedDocuments[key]}
                    onButtonClick={() => this.onUploadClick(key)}
                    inputProps={this.props.inputProps}
                    buttonLabel={this.props.buttonLabel}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    );
  }
}

DocumentList.propTypes = {
  classes: PropTypes.object.isRequired,
  documents: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired
};
const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(DocumentList)
);
