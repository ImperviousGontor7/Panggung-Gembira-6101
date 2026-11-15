import * as homeService from "./home.service.js";

// ======================================================
// GET HOME
// ======================================================

export async function getHome(
  req,
  res,
  next,
) {
  try {
    const {
      placement,
      sectionType,
      status,
    } = req.query;

    const items =
      await homeService.getHomeSections(
        {
          placement,
          sectionType,
          status,
        },
      );

    return res.json({
      success: true,

      data: items,
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// GET BY PLACEMENT
// ======================================================

export async function getHomeByPlacement(
  req,
  res,
  next,
) {
  try {
    const {
      placement,
    } = req.params;

    const items =
      await homeService.getHomeSectionsByPlacement(
        placement,
      );

    return res.json({
      success: true,

      data: items,
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// GET DETAIL
// ======================================================

export async function getHomeDetail(
  req,
  res,
  next,
) {
  try {
    const item =
      await homeService.getHomeSectionById(
        req.params.id,
      );

    return res.json({
      success: true,

      data: item,
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// CREATE
// ======================================================

export async function createHome(
  req,
  res,
  next,
) {
  try {
    const authorId =
      req.user?.id ??
      null;

    const item =
      await homeService.createHomeSection(
        req.body,
        authorId,
      );

    return res.status(201).json({
      success: true,

      data: item,

      message:
        "Home section berhasil dibuat.",
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// UPDATE
// ======================================================

export async function updateHome(
  req,
  res,
  next,
) {
  try {
    const item =
      await homeService.updateHomeSection(
        req.params.id,
        req.body,
      );

    return res.json({
      success: true,

      data: item,

      message:
        "Home section berhasil diperbarui.",
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// DELETE
// ======================================================

export async function deleteHome(
  req,
  res,
  next,
) {
  try {
    const item =
      await homeService.deleteHomeSection(
        req.params.id,
      );

    return res.json({
      success: true,

      data: item,

      message:
        "Home section berhasil dihapus.",
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreHome(
  req,
  res,
  next,
) {
  try {
    const item =
      await homeService.restoreHomeSection(
        req.params.id,
      );

    return res.json({
      success: true,

      data: item,

      message:
        "Home section berhasil dipulihkan.",
    });
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// REORDER
// ======================================================

export async function reorderHome(
  req,
  res,
  next,
) {
  try {
    const items =
      await homeService.reorderHomeSections(
        req.body.items,
      );

    return res.json({
      success: true,

      data: items,

      message:
        "Urutan Home berhasil diperbarui.",
    });
  } catch (error) {
    return next(error);
  }
}