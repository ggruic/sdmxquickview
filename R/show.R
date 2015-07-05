show <- function(url) {
  ##myUrl <- "https://sdw-wsrest.ecb.europa.eu/service/data/EXR/M.CHF.EUR.SP00.A"
  ##codelist: https://sdw-wsrest.ecb.europa.eu/service/codelist/ECB/CL_ORGANISATION/latest?detail=full
  if (url != '') {
    dataset <- rsdmx::readSDMX(url)
    stats <- as.data.frame(dataset)
    if (nrow(stats) == 0) {
      stats = 'na'
    } else {
      stats <- subset(stats, select=c("FREQ", "CURRENCY", "CURRENCY_DENOM", "EXR_TYPE", "EXR_SUFFIX", "TITLE_COMPL", "obsTime", "obsValue"))
    }
  } else {
    stats <- 'empty'
  }
  ##list(message = stats)
  list(message = stats)
}
