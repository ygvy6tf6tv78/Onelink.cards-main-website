import AVFoundation
import Foundation

enum CompressionError: Error {
  case invalidArguments
  case exportSessionUnavailable
  case exportFailed(String)
}

func preferredFileType(for session: AVAssetExportSession) -> AVFileType? {
  if session.supportedFileTypes.contains(.mp4) {
    return .mp4
  }
  if session.supportedFileTypes.contains(.mov) {
    return .mov
  }
  return session.supportedFileTypes.first
}

let args = CommandLine.arguments

guard args.count == 3 else {
  throw CompressionError.invalidArguments
}

let sourceURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

let asset = AVURLAsset(url: sourceURL)
guard let exportSession = AVAssetExportSession(
  asset: asset,
  presetName: AVAssetExportPreset1280x720
) else {
  throw CompressionError.exportSessionUnavailable
}

let fileManager = FileManager.default
if fileManager.fileExists(atPath: outputURL.path) {
  try fileManager.removeItem(at: outputURL)
}

guard let outputFileType = preferredFileType(for: exportSession) else {
  throw CompressionError.exportFailed("No supported file type found.")
}

exportSession.outputURL = outputURL
exportSession.outputFileType = outputFileType
exportSession.shouldOptimizeForNetworkUse = true

let semaphore = DispatchSemaphore(value: 0)
exportSession.exportAsynchronously {
  semaphore.signal()
}
semaphore.wait()

if let error = exportSession.error {
  throw CompressionError.exportFailed(error.localizedDescription)
}

guard exportSession.status == .completed else {
  throw CompressionError.exportFailed("Export status: \(exportSession.status.rawValue)")
}

print("Exported \(sourceURL.lastPathComponent) -> \(outputURL.lastPathComponent)")
